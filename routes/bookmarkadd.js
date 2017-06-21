import express from 'express';
import bookmarkslistController from '../controllers/bookmarkslist';

const router = express.Router();

/*
 *  List bookmarks
 */
router.get('/', (req, res, next) => {
  res.json(bookmarkslistController.list());
});

/*
 *  Create bookmarks
 */
router.post('/', (req, res, next) => {
  const newBookmark = bookmarkslistController.create(req.body);
  res.json(newBookmarks);
});

/*
 *  Get candy
 */
 router.get('/:id', (req, res, next) => {
   const bookmarkId = req.params.id;
   res.json(bookmarkslistController.get(bookmarkId));
 });

 /*
  *  Update bookmark
  */
  router.put('/', (req, res, next) => {
    const newBookmark = bookmarkslistController.update(req.body);
    res.json(newBookmarks);
  });

  /*
   *  Delete bookmark
   */
   router.delete('/:id', (req, res, next) => {
     const bookmarkId = req.params.id;
     res.json(bookmarkslistController.delete(bookmarkId));
   });

export default router;
