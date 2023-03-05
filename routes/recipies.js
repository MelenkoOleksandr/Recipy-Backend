import { Router } from "express";
import { createRecipy, deleteRecipy, getRecipy, getRecipies, updateRecipy } from './../controllers/recipy.js';

const router = Router();

router.get("/", getRecipies);
router.get("/:id", getRecipy);
router.post("/", createRecipy);
router.put("/:id", updateRecipy);
router.delete("/:id", deleteRecipy);

export default router;