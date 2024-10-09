import { Router } from 'express';
import BookingController from '../controllers/bookingController';

const router = Router();

router.get('/getAllBookings', BookingController.getAllBookings); // Admin only
router.get('/getBookingById/:id', BookingController.getBookingById); // Customer and Admin
router.post('/createBooking', BookingController.createBooking); // Admin only
router.put('/updateBooking/:id', BookingController.updateBooking); // Admin only
router.delete('/deleteBooking/:id', BookingController.deleteBooking); // Admin only

export default router;
