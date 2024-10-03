//import cors from 'cors'
import express from 'express'
import {getFarm} from '../controllers/farm.js'




const router = express.Router();
router.get('/', getFarm);

export default router