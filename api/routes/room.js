import { Router } from 'express';
import RoomController from '../controllers/roomController';
import authorizeRoles from '../middlewares/authorization';

const router = Router();

router.get('/getAllRooms', authorizeRoles('admin'), RoomController.getAllRooms);
router.post('/getAllAvailableRoomsByDate', authorizeRoles('admin'), RoomController.getAllAvailableRoomsByDate);
router.post('/createRoom', authorizeRoles('admin'), RoomController.createRoom);
router.put('/updateRoom/:id', authorizeRoles('admin'), RoomController.updateRoom);
router.get('/getRoomTypes', authorizeRoles('admin'), authorizeRoles('admin'), RoomController.getRoomTypes);
router.get('/getAvailableRoomsByType/:type', authorizeRoles('admin'), RoomController.getAvailableRoomsByType);
router.delete('/deleteRoom/:id', authorizeRoles('admin'), RoomController.deleteRoom);

export default router;