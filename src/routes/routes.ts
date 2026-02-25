import { Router } from "express";
import { createEvaluations, getEvaluations } from "../controllers/controllers";

const router = Router();

router.post("/evaluations", createEvaluations);
router.get("/evaluations", getEvaluations);

export default router;