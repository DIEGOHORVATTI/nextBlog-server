import express from "express";

import { TagControllers } from "./tag.controller";

const router = express.Router();

router.post("/", TagControllers.addTag);

export const TagRoutes = router;
