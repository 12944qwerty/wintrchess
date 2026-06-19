import { Router } from "express";

import pagesRouter from "./pages";
import apiRouter from "./api";

const router = Router();

router.use("/",
    apiRouter,
    pagesRouter
);

export default router;