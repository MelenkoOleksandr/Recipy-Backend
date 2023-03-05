import { Router } from "express";
import { verifyToken } from "../verifyToken.js";
import { addProductToFridge, createProduct, deleteProduct, getProduct, getProducts, getProductsInFridge, removeProductFromFridge, updateProduct, updateProductInFridge } from './../controllers/product.js';

const router = Router();

router.get('/fridge', verifyToken, getProductsInFridge)
router.post('/fridge', verifyToken, addProductToFridge)
router.delete('/fridge/:id', verifyToken, removeProductFromFridge)
router.put('/fridge/:id', verifyToken, updateProductInFridge)

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


export default router;