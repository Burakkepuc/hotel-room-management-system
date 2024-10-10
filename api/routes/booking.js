import { Router } from 'express';
import BookingController from '../controllers/bookingController';
import authorizeRoles from '../middlewares/authorization';

const router = Router();

router.get('/getAllBookings', authorizeRoles('admin'), BookingController.getAllBookings);
router.get('/getBookingById/:id', authorizeRoles('admin', 'user'), BookingController.getBookingById);
router.post('/createBooking', authorizeRoles('admin',), BookingController.createBooking);
router.put('/updateBooking/:id', authorizeRoles('admin',), BookingController.updateBooking);
router.delete('/deleteBooking/:id', authorizeRoles('admin',), BookingController.deleteBooking);

export default router;
