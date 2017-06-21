const uuidV4 = require('uuid/v4');

let bookmarkslistDefault = [
  {id: "1", name: "Chewing Gum" , color: "Red", price: 12  },
  {id: "2", name: "Pez"         , color: "Green", price: 10 },
  {id: 3, name: "Marshmallow" , color: "Pink", price: 8  },
  {id: 4, name: "Bookmarks Stick" , color: "Blue", price: 6   }
];

let bookmarkslist = [];

let init = () => {
  bookmarkslistDefault.forEach((bookmarks) => {
    bookmarks.id = uuidV4();
    bookmarkslist.push(bookmarks);
  });
}
init();

/*
 *  Return all the bookmarks
 */
exports.list = () => {
    return bookmarkslist;
}

/*
 *  Create bookmarks ( Crud )
 */
exports.create = (bookmarks) => {
    bookmarks.id = uuidV4();
    bookmarkslist.push(bookmarks);
    return bookmarks;
}

/*
 *  Get bookmarks ( cRud )
 */
exports.get = (id) => {

  var bookmarks = bookmarkslist.filter((bookmarks) => {
    return bookmarks.id == id;
  });

  // Check function for more than 1 bookmarks with the same id
  // Write the error to the log

  return bookmarks[0]; // What bug could be here ?
}

/*
 *  Update bookmarks ( crUd )
 */
exports.update = ( newBookmarks ) => {

  bookmarkslist.forEach((bookmarks, index)=>{
    if(bookmarks.id == newBookmarks.id ){
      bookmarkslist[index] = newBookmarks;
    }
  });

  return newBookmarks;
}

/*
 *  Delete bookmarks ( cruD )
 */
exports.delete = (id) => {

  let deleted = false;

  bookmarkslist.forEach((bookmarks, index)=>{
    if(bookmarks.id == id ){
      bookmarkslist.splice(index,1);
      deleted = true;
    }
  });

  return deleted;
}
