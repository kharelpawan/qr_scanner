//import cors from 'cors'
import express from 'express'
import {getFarmers, getFarmer, createFarmer, editFarmer, deleteFarmer} from '../controllers/farmer.js'

const router = express.Router();
router.get('/', getFarmers);
router.get('/:id', getFarmer);
router.post('/createfarmer', createFarmer);
router.patch('/:farmer_id', editFarmer);
router.delete('/:farmer_id', deleteFarmer);

export default router