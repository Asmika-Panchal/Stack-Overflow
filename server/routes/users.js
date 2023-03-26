import express from "express";

import { login, signup } from "../controllers/auth.js";
import { sendmail } from "../controllers/sendmail.js";
import { getAllUsers, updateProfile } from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/sendmail", sendmail);

router.get("/getAllUsers", getAllUsers);

router.patch("/update/:id", auth, updateProfile);

export default router;
