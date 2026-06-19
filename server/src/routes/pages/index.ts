import { Router } from "express";

import appRouter from "@/lib/appRouter";
import featuresRouter from "./features";
import footerRouter from "./footer";

const router = Router();

router.use("/",
    featuresRouter,
    footerRouter
);

router.get("/settings*", appRouter("settings.html"));

router.get("/", async (req, res) => {
    res.redirect("/analysis");
});

router.get("/*", appRouter("unfound.html"));

export default router;