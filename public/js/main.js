var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 17,
  center: current
};

function locationSuccess(position) {
  console.log('Location success')
  var current = {lat: position.coords.latitude, lng: position.coords.longitude};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: current
  });

  var marker = new google.maps.Marker({
    position: current,
    map: map
  });


var service;
var infowindow;

function initialize() {
  var searchlocation = new map.LatLng();

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: current
    });

  var request = {
    location: searchlocation,
    radius: '500',
    query: 'restaurant'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

  // var contentString = '<div id="content">'+
  //     '<div id="siteNotice">'+
  //     '</div>'+
  //     '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
  //     '<div id="bodyContent">'+
  //     '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
  //     'sandstone rock formation in the southern part of the '+
  //     'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
  //     'south west of the nearest large town, Alice Springs; 450&#160;km '+
  //     '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
  //     'features of the Uluru - Kata Tjuta National Park. Uluru is '+
  //     'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
  //     'Aboriginal people of the area. It has many springs, waterholes, '+
  //     'rock caves and ancient paintings. Uluru is listed as a World '+
  //     'Heritage Site.</p>'+
  //     '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
  //     'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
  //     '(last visited June 22, 2009).</p>'+
  //     '</div>'+
  //     '</div>';

  // var infowindow = new google.maps.InfoWindow({
  // content: contentString
  // });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

function locationError() {
  console.log('Cound not get location')
}


// Get user location
function initMap() {
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError);

}

$(document).ready(function() {

  // Place JavaScript code here...

});

//---------------------------------------------------------------------------------

$(function() {

    /* Candy store */
    var store = [];

    /* Update Subtotal */
    function updateSubTotal(productRow){
        var qtr = $(productRow).find('input').first().val();
        var priceTxt = $(productRow).find('.price').first().text();

        // Clean price
        priceTxt = priceTxt.trim();
        priceTxt = priceTxt.replace('$','');
        var price = parseFloat(priceTxt);

        /* Update subtotal */
        var subtotal = $(productRow).find('.subtotal').first();
        var totalPrice = qtr * price;
        subtotal.text('$' + totalPrice.toFixed(2));
    }

    /* Delete product */
    function deleteProduct(productRow){
      //$(productRow).remove();
      var id = $(productRow).data('id');
      console.log(id);
    }

    /* Create product */
    function createProduct(){
          var name = $("input[name='name']").val();
          var price = $("input[name='price']").val();

          // Check input
          if(name.length === 0 ){
            $('.create .name .form-group').addClass('has-error');
            return;
          }
          $('.create .name .form-group').removeClass('has-error');

          if(price.length === 0 || price === "0"){
            $('.create .price .form-group').addClass('has-error');
            return;
          }
          $('.create .price .form-group').removeClass('has-error');

          // Setup template
          var tpl = $('#productRowTpl').html();
          tpl = tpl.replace('{{Name}}', name);
          tpl = tpl.replace('{{Price}}', price);

          // Append the row
          $('#cart > div').append(tpl);

          // Clear inputs
          $("input[name='name']").val('');
          $("input[name='price']").val('');
    }

    /* Create product Row */
    function createProductRow(candy){

      // Setup template
      var tpl = $('#productRowTpl').html();
      tpl = tpl.replace('{{Id}}', candy.id);
      tpl = tpl.replace('{{Name}}', candy.name);
      tpl = tpl.replace('{{Color}}', candy.color);
      tpl = tpl.replace('{{Price}}', candy.price);

      // Append the row
      $('#cart > div').append(tpl);
    }


    function showCreateForm() {
      $('#editform').modal('show');
      $('#editform').addClass('createForm');
      $('.modal-title').text('Create Candy');
      $('button.submit').text('Create');
    }


    // Show update form */
    function showUpdateForm(candy){
      $('#editform').modal('show');
      $('#editform').addClass('updateForm');

      $('#editform #name').val(candy.name);
      $('#editform #color').val(candy.color);
      $('#editform #price').val(candy.price);
      $('#editform #id').val(candy.id);
    }

    /* Reset modal */
    function resetModal () {
      $('.updateForm #id').val('');
      $('.updateForm #name').val('');
      $('.updateForm #color').val('');
      $('.updateForm #price').val('');
      $('#editform').removeClass('updateForm');
    }

    // Create candy on server
    function createProductAjax(){

      var candy = {};
      candy.id = $('.createForm #id').val();
      candy.name = $('.createForm #name').val();
      candy.color = $('.createForm #color').val();
      candy.price = $('.createForm #price').val();

      $.ajax({
        method: 'POST',
        url: '/api',
        data: candy
      }).done(function(candy){
            createProductRow(candy);
            $('[data-id=' + candy.id + ']').hide();
            $('#editform').modal('hide');
            $('[data-id=' + candy.id + ']').fadeIn();
      });
    }


    // Update candy on server
    function updateProductAjax() {

        var candy = {};
        candy.id = $('.updateForm #id').val();
        candy.name = $('.updateForm #name').val();
        candy.color = $('.updateForm #color').val();
        candy.price = $('.updateForm #price').val();

        $.ajax({
          method: 'PUT',
          url: '/api',
          data: candy
        }).done(function(data){
            resetModal();

            // Setup template
            var tpl = $('#productRowTpl').html();
            tpl = tpl.replace('{{Id}}', candy.id);
            tpl = tpl.replace('{{Name}}', candy.name);
            tpl = tpl.replace('{{Color}}', candy.color);
            tpl = tpl.replace('{{Price}}', candy.price);

            // Hide
            $('#editform').modal('hide');

            $('[data-id=' + candy.id + ']').fadeOut(function(){
              $('[data-id=' + candy.id + ']').replaceWith(tpl);
              $('[data-id=' + candy.id + ']').fadeIn();
            });


        //    $('[data-id=' + candy.id + ']').replaceWith(tpl);
        //    $('[data-id=' + candy.id + ']').fadeIn();
        });
    }


    /* Calculate grand total */
    function calculateGrandTotal(){
      var subtotalElements = $('.subtotal');
      var total = 0;

      subtotalElements.each(function( index ) {
        // Clean price
        var subtotalTxt = $(this).text();
        subtotalTxt = subtotalTxt.trim();
        subtotalTxt = subtotalTxt.replace('$','');
        var subtotal = parseFloat(subtotalTxt);
        total += subtotal;
      });

      //Update
      $('#grandTotal').text(total.toFixed(2));
    }


    /* Attach event listeners */
    $('#cart').on('keyup', '*', function(event){
        var productRow = $(event.target).parents('.product')[0];
        updateSubTotal(productRow);
        calculateGrandTotal();
    });

    $('#cart').on('click', '.delete', function(event){
      var productRow = $(event.target).parents('.product')[0];
      deleteProduct(productRow);
      calculateGrandTotal();
    });

    $('.create').on('click', '.createProduct', function(event){
      showCreateForm();
    });

    $('#cart').on('click', '.update', function(event){
      var productRow = $(event.target).parents('.product')[0];
      var id = $(productRow).data('id');
      var candy = store.find(function(item){
          return item.id == id;
      })
      showUpdateForm(candy);
    });

    $('body').on('click', '.updateForm .submit', function(){
        updateProductAjax();
    })

    $('body').on('click', '.createForm .submit', function(){
        createProductAjax();
    })


    /* init store */
    $.ajax({
      method: "GET",
      url: "/API"
    })
    .done(function( data ) {
        store = data;
        data.forEach(function(candy){
            createProductRow(candy);
        });
    });

    $('#editform').on('shown.bs.modal', function () {
      $('#name').focus();
    });
});
