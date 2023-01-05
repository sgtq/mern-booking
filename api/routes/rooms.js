import express from 'express';
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from '../controllers/RoomController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/:hotelId', verifyAdmin, createRoom);
router.put('/:id', verifyAdmin, updateRoom);
router.delete('/:id', verifyAdmin, deleteRoom);

export default router;