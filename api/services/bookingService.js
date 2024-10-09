import Booking from "../models/bookingModel";
import Room from "../models/roomModel";
class BookingService {
  static async getAllBookings(req, res) {
    try {
      const bookings = await Booking.find().populate('user room')
      return { type: true, data: bookings, message: 'Booking fetched successfully' }
    } catch (error) {
      return { type: false, message: 'An error occurred getting all booking', error: error.message };
    }
  }

  static async getBookingById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return { type: false, message: 'Booking id not found' };
      }

      const booking = await Booking.findById(id).populate('user room');
      return { type: true, data: booking, message: 'Booking by id fetched successfully' }
    } catch (error) {
      return { type: false, message: 'An error occurred by getting booking by id', error: error.message };

    }
  }

  static async createBooking(req, res) {
    try {
      const { userId, roomId, startDate, endDate } = req.body;

      const room = await Room.findById(roomId);
      if (!room) {
        return { type: false, message: 'Room not found' };
      }
      if (!room.isAvailable) {
        return { type: false, message: 'Room is already booked' };
      }

      const booking = await Booking.create({ user: userId, room: roomId, startDate, endDate })


      room.isAvailable = false;
      await room.save();

      return { type: true, data: booking, message: 'Booking created successfully' }
    } catch (error) {
      return { type: false, message: 'An error occurred create a booking', error: error.message };
    }
  }

  static async updateBooking(req, res) {
    try {
      const { id } = req.params;
      const { user, room, startDate, endDate } = req.body;

      const updatedBooking = await Booking.findByIdAndUpdate(id, { user, room, startDate, endDate }, { new: true });

      if (!updatedBooking) {
        return res.status(404).json({ type: false, message: 'Booking not found' });
      }
      return { type: true, data: updatedBooking, message: 'Booking updated successfully' }

    } catch (error) {
      console.log(error);
      return { type: false, message: 'An error occurred update a booking', error: error.message };

    }
  }

  static async deleteBooking(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ type: false, message: 'Booking id not found' });
      }

      const deletedBooking = await Booking.findByIdAndDelete(id);

      return { type: true, data: deletedBooking, message: 'Booking deleted successfully' };
    } catch (error) {
      return { type: false, message: 'An error occurred delete a booking', error: error.message };

    }
  }
}

export default BookingService;