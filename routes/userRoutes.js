import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controller/userController.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router;
