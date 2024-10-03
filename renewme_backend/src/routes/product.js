//import cors from 'cors'
import express from 'express'
import {createProduct, getProduct, getProducts, getAllProductDetails} from '../controllers/product.js'

const router = express.Router();
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.get('/all/:id', getAllProductDetails)
// router.patch('/:farmer_id', editFarmer);
// router.delete('/:farmer_id', deleteFarmer);

export default router