import express from 'express';
import { createHotel, deleteHotel, getAllHotels, getHotelById, updateHotel } from '../controllers/HotelController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', getAllHotels);
router.get('/:id', getHotelById);
router.post('/', verifyAdmin, createHotel);
router.put('/:id', verifyAdmin, updateHotel);
router.delete('/:id', verifyAdmin, deleteHotel);


export default router;