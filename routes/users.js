import { Router } from "express";
import { verifyToken } from "../verifyToken.js";
import { deleteUser, updateUser } from './../controllers/user.js';

const router = Router();

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;