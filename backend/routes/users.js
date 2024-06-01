import express from "express";
import { getUsers, addQuestion } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/professor/turma/novalista", addQuestion);

export default router;