import { Router } from 'express';
import RoomController from '../controllers/roomController';

const router = Router();

router.get('/getAllRooms', RoomController.getAllRooms);
router.post('/createRoom', RoomController.createRoom);
router.put('/updateRoom/:id', RoomController.updateRoom);
router.get('/getRoomTypes', RoomController.getRoomTypes);
router.get('/getAvailableRoomsByType/:type', RoomController.getAvailableRoomsByType);
router.delete('/deleteRoom/:id', RoomController.deleteRoom);

export default router;