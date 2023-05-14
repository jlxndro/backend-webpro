import express from "express";
import {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getNovel,
    getComic,
    getBiography,
    getEducation
} from "../controllers/BookController.js"

const router = express.Router();

router.get('/books', getBooks);
router.get('/book/:id', getBookById);
router.get('/book', createBook);
router.get('/book/:id', updateBook);
router.get('/book/:id', deleteBook);
router.get("/novel", getNovel);
router.get("/comic", getComic);
router.get("/biography",getBiography);
router.get("/education",getEducation);

export default router;