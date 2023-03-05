import { Router } from "express";
import { getRecipyCategories, getRecipyCategory, createRecipyCategory, updateRecipyCategory, deleteRecipyCategory } from './../controllers/recipyCategory.js';

const router = Router();

router.get("/", getRecipyCategories);
router.get("/:id", getRecipyCategory);
router.post("/", createRecipyCategory);
router.put("/:id", updateRecipyCategory);
router.delete("/:id", deleteRecipyCategory);

export default router;