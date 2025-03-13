import express from "express";
import { processEmail } from "../controllers/mailerController";

const router = express.Router();

router.post("/", processEmail);

export default router;
