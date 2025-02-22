import express from "express"
import {register,login,logout,updateProfile, updateProfilePhoto} from "../controllers/user_controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register")
.post(singleUpload,register)

router.route("/login")
.post(login)

router.route("/logout")
.get(logout)

router.route("/profile/update")
.post(isAuthenticated,singleUpload,updateProfile);

router.route("/profile/update/picture")
.post(isAuthenticated,singleUpload,updateProfilePhoto);

export default router;