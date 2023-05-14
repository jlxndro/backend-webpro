import express from "express";
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/CategoryController.js"

const router = express.Router();

router.get('/categories', getCategories);
router.get('/category/:id', getCategoryById);
router.get('/category', createCategory);
router.get('/category/:id', updateCategory);
router.get('/category/:id', deleteCategory);


export default router;