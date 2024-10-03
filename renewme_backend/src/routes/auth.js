//import cors from 'cors'
import express from 'express'
import {login, logout,registerAdmin, getAllAdmins} from '../controllers/auth.js'

const router = express.Router();
router.get("/", getAllAdmins)
router.post("/register", registerAdmin);
router.post("/login", login); //bholi ko kam
router.post("/logout", logout);

export default router