import { Router } from "express";
import { getProductCategories, getProductCategory, createProductCategory, updateProductCategory, deleteProductCategory } from './../controllers/productCategory.js';

const router = Router();

router.get("/", getProductCategories);
router.get("/:id", getProductCategory);
router.post("/", createProductCategory);
router.put("/:id", updateProductCategory);
router.delete("/:id", deleteProductCategory);

export default router;