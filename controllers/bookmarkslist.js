const User = require('../models/User');
const Bookmark = require('../models/bookmarks')

let bookmarkslistDefault = [
  {id: "77bb1088bb13f4569d172f10b120357bee594f49", name: "On The Table" , formatted_address: "118 Pasir Panjang Rd, Singapore 118541", comments: ":)"  }
];

let bookmarkslist = [];

let init = () => {
  bookmarkslistDefault.forEach((bookmarks) => {
    bookmarks.id = User();
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
exports.create = (req, res) => {
    let newBookmark = new Bookmark()
    newBookmark.user = req.body.user
    newBookmark.restaurant = req.body.restaurant_id
    newBookmark.name = req.body.name
    newBookmark.formatted_address = req.body.formatted_address

    newBookmark.save((err) => {
      if (err) return res.json({message:err})
      res.send('user created')
    })
}

/*
 *  Get bookmarks ( cRud )
 */

exports.getAll = (req, res) => {
  Bookmark.find((err, bookmark) => {
    if (err) return res.send(err)
    res.send(bookmark)
  })
}

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
