import express from "express";
import { getBalance, getUsers, transferMoney, getStatement } from "../controllers/accountController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/balance", protect, getBalance);
router.get("/users", protect, getUsers);
router.post("/transfer", protect, transferMoney);
router.get("/statement", protect, getStatement);

export default router;