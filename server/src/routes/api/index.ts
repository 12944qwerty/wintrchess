import { Router } from "express";

import analyseRouter from "./analysis/analyse";

const router = Router();

router.use("/api",
    analyseRouter
);

export default router;