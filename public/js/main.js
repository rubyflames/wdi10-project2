// var map = new google.maps.Map(document.getElementById('map'), {
//   zoom: 17,
//   center: current
// });

// Get user location
function initMap() {
  // navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
  var map;
  var markers = []
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
    mapTypeId: 'roadmap'
  };

  // Display map on page
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  map.setTilt(45);
  console.log('map loaded');

  // Multiple Markers
  // use jquery to get all list items from window
  // for each item, add a corresponding marker
  itemArr = document.getElementById('placeinfo').getElementsByTagName('ul')
  for (var i=0; i<itemArr.length;i++) {
    var markerContent = itemArr[i].innerText.split('\n')
    markerContent.pop()
    markers.push(markerContent)
  }

  // Info window content
  var infoWindowContent = []
  for (var i in markers) {
    infoWindowContent[i] = [
      '<div class="info_content">' + '<h4>' + markers[i][0] + '</h4>' +
      '<h5>' + markers[i][1] + '</h5><button class="bookmark">Bookmark</button>' + '</div>'
    ]
  }

  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(), marker, i
  // Loop through to place marker on map
  for (i = 0; i < markers.length; i++) {
    var position = new google.maps.LatLng(parseFloat(markers[i][2]), parseFloat(markers[i][3]))
    bounds.extend(position)
    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: markers[i][0]
    })

    // Allow each marker to have an info window
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infoWindow.setContent(infoWindowContent[i][0])
        infoWindow.open(map, marker)
        var bookmarkButtons = document.getElementsByClassName('bookmark')[0]
        bookmarkButtons.addEventListener('click', function(e){
          console.log(e.target.previousSibling.innerHTML)
          var data = {
            // user: "test",
            // restaurant_id: "1",
            name: e.target.previousSibling.previousSibling.innerHTML,
            formatted_address: e.target.previousSibling.innerHTML
          }
          var obj = JSON.parse(data)
          $.ajax({
            method: "POST",
            url: "/createBookmark",
            headers: {
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            data: data,
            success: function() {
              console.log('bookmark created')
              $.ajax({
                method: "GET",
                url: "/bookmarks",
                success: function(data) {
                  $('#overlay1 p').remove()
                  $('#overlay1').append('<p>' +JSON.stringify(data) + '</p>')
                  // $.each(data.items,function(i,item)
                  // $('#overlay1').append(obj.innerText.name + " " + obj.innerText.formatted_address)
                }
              })
            }
          })
        })
        console.log(bookmarkButtons)
      }
    })(marker, i))

//     (function() {
//   var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
//   $.getJSON( flickerAPI, {
//     tags: "mount rainier",
//     tagmode: "any",
//     format: "json"
//   })
//     .done(function( data ) {
//       $.each( data.items, function( i, item ) {
//         $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
//         if ( i === 3 ) {
//           return false;
//         }
//       });
//     });
// })();

    // automatically center map to fit all markers
    map.fitBounds(bounds)
  }

  // Override map zoom
  var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
    this.setZoom(12)
    google.maps.event.removeListener(boundsListener)
  })
}


/* Create product Row */
function createBookmarkRow(bookmarks){

  // Setup template
  var tpl = $('#bookmarkRowTpl').html();
  tpl = tpl.replace('{{Id}}', restaurant.id);
  tpl = tpl.replace('{{Name}}', restaurant.name);
  tpl = tpl.replace('{{Address}}', restaurant.formatted_address);

  // Append the row
  $('#overlay1 > #bookmarkRowTpl').append(tpl);
  // <button type="button" class="btn btn-danger">Remove</button>
//   $('#overlay1 > div').append(tpl + '<button type="button" class="btn btn-danger">Remove</button>');
 }

/* Delete product Row */
function deleteBookmark(nommarkRow){
  //$(productRow).remove();
  var id = $(nommarkRow).data('id');
  console.log(id);
  id.remove();
}


$(() => {
  $.ajax({
    method: "GET",
    url: "/bookmarks",
    success: function(data) {
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        $('#overlay1').append(
          '<ul>' +
            '<li>'+ data[i].name + '</li>'+
            '<li>'+ data[i].formatted_address + '</li>'+
            '<li style="display:none;">'+ data[i]._id + '</li>'+
          '</ul>')
      }


      // var obj = JSON.parse(data);
      // $('#overlay1').append(obj.innerText)}
      //
      // for (i=0,i<bookmarkslist.length,i++) {
      //   document.getElementById('bookmarkRowTpl').inerHTML = obj[i].name + " " + obj[i].formatted_address
      // }

    }
  })


      $('#overlay1').on('click', '.delete', function(event){
        var nommarkRow = $(event.target).parents('.nommark')[0];
        deleteBookmark(nommarkRow);
      });
})





// $(document).ready(function() {
//
//   // Place JavaScript code here...
//
// });

// function locationSuccess(position) {
//   console.log('Location success')
//   var current = {lat: position.coords.latitude, lng: position.coords.longitude};
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 17,
//     center: current
//   });
//
//   var marker = new google.maps.Marker({
//     position: current,
//     map: map
//   });
//
//   var contentString = '<div>' + marker.getPosition() + '</div>'
//   infowindow = new google.maps.InfoWindow({
//     content: contentString
//   })
//   console.log(marker.getPosition(), 'getposition')
//   console.log(marker.position, 'position')
//   marker.addListener('click', function() {
//     infowindow.open(map, marker);
//   });
// }
//
//
// var service;
// var infowindow;
//
// function initialize() {
//   var searchlocation = map.LatLng();
//
//   var request = {
//     location: searchlocation,
//     radius: '500',
//     query: 'restaurant'
//   };
//
//   service = new google.maps.places.PlacesService(map);
//   service.textSearch(request, callback);
// }
//
// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }

  // var contentString = 'hello';

  // var infowindow = new google.maps.InfoWindow({
  // content: contentString
  // });


// function locationError() {
//   console.log('Cound not get location')
// }




//---------------------------------------------------------------------------------

// $(function() {
//
//     /* Bookmarks list */
//     var bookmarkslist = [];
//
//     /* Delete product */
//     function deleteProduct(productRow){
//       //$(productRow).remove();
//       var id = $(productRow).data('id');
//       console.log(id);
//     }
//
//     /* Create product */
//     function createProduct(){
//           var name = $("input[name='name']").val();
//           var price = $("input[name='price']").val();
//
//           // Check input
//           if(name.length === 0 ){
//             $('.create .name .form-group').addClass('has-error');
//             return;
//           }
//           $('.create .name .form-group').removeClass('has-error');
//
//           if(price.length === 0 || price === "0"){
//             $('.create .price .form-group').addClass('has-error');
//             return;
//           }
//           $('.create .price .form-group').removeClass('has-error');
//
//           // Setup template
//           var tpl = $('#productRowTpl').html();
//           tpl = tpl.replace('{{Name}}', name);
//           tpl = tpl.replace('{{Price}}', price);
//
//           // Append the row
//           $('#overlay1 > div').append(tpl);
//
//           // Clear inputs
//           $("input[name='name']").val('');
//           $("input[name='price']").val('');
//     }
//
//     /* Create product Row */
//     function createProductRow(bookmarks){
//
//       // Setup template
//       var tpl = $('#productRowTpl').html();
//       tpl = tpl.replace('{{Id}}', restaurant.id);
//       tpl = tpl.replace('{{Name}}', restaurant.name);
//       tpl = tpl.replace('{{Address}}', restaurant.formatted_address);
//
//       // Append the row
//       $('#overlay1 > div').append(tpl);
//     }
//
//
//     function showCreateForm() {
//       $('#editform').modal('show');
//       $('#editform').addClass('createForm');
//       $('.modal-title').text('Create Candy');
//       $('button.submit').text('Create');
//     }
//
//
//     // Show update form */
//     function showUpdateForm(candy){
//       $('#editform').modal('show');
//       $('#editform').addClass('updateForm');
//
//       $('#editform #name').val(candy.name);
//       $('#editform #color').val(candy.color);
//       $('#editform #price').val(candy.price);
//       $('#editform #id').val(candy.id);
//     }
//
//     /* Reset modal */
//     function resetModal () {
//       $('.updateForm #id').val('');
//       $('.updateForm #name').val('');
//       $('.updateForm #color').val('');
//       $('.updateForm #price').val('');
//       $('#editform').removeClass('updateForm');
//     }
//
//     // Create candy on server
//     function createProductAjax(){
//
//       var candy = {};
//       candy.id = $('.createForm #id').val();
//       candy.name = $('.createForm #name').val();
//       candy.color = $('.createForm #color').val();
//       candy.price = $('.createForm #price').val();
//
//       $.ajax({
//         method: 'POST',
//         url: '/api',
//         data: candy
//       }).done(function(candy){
//             createProductRow(candy);
//             $('[data-id=' + candy.id + ']').hide();
//             $('#editform').modal('hide');
//             $('[data-id=' + candy.id + ']').fadeIn();
//       });
//     }
//
//
//     // Update candy on server
//     function updateProductAjax() {
//
//         var candy = {};
//         candy.id = $('.updateForm #id').val();
//         candy.name = $('.updateForm #name').val();
//         candy.color = $('.updateForm #color').val();
//         candy.price = $('.updateForm #price').val();
//
//         $.ajax({
//           method: 'PUT',
//           url: '/api',
//           data: candy
//         }).done(function(data){
//             resetModal();
//
//             // Setup template
//             var tpl = $('#productRowTpl').html();
//             tpl = tpl.replace('{{Id}}', candy.id);
//             tpl = tpl.replace('{{Name}}', candy.name);
//             tpl = tpl.replace('{{Color}}', candy.color);
//             tpl = tpl.replace('{{Price}}', candy.price);
//
//             // Hide
//             $('#editform').modal('hide');
//
//             $('[data-id=' + candy.id + ']').fadeOut(function(){
//               $('[data-id=' + candy.id + ']').replaceWith(tpl);
//               $('[data-id=' + candy.id + ']').fadeIn();
//             });
//
//
//         //    $('[data-id=' + candy.id + ']').replaceWith(tpl);
//         //    $('[data-id=' + candy.id + ']').fadeIn();
//         });
//     }
//
//
//     /* Attach event listeners */
//     $('#overlay1').on('click', '.delete', function(event){
//       var productRow = $(event.target).parents('.product')[0];
//       deleteProduct(productRow);
//       calculateGrandTotal();
//     });
//
//     $('.create').on('click', '.createProduct', function(event){
//       showCreateForm();
//     });
//
//     $('#overlay1').on('click', '.update', function(event){
//       var productRow = $(event.target).parents('.product')[0];
//       var id = $(productRow).data('id');
//       var candy = store.find(function(item){
//           return item.id == id;
//       })
//       showUpdateForm(candy);
//     });
//
//     $('body').on('click', '.updateForm .submit', function(){
//         updateProductAjax();
//     })
//
//     $('body').on('click', '.createForm .submit', function(){
//         createProductAjax();
//     })
//
//
//     /* init store */
//     $.ajax({
//       method: "GET",
//       url: "/API"
//     })
//     .done(function( data ) {
//         store = data;
//         // data.forEach(function(candy){
//         //     createProductRow(candy);
//         // });
//     });
//
//     $('#editform').on('shown.bs.modal', function () {
//       $('#name').focus();
//     });
// });
