import BookingService from "../services/bookingService";
import { createBookingValidation, updateBookingValidation } from "../validations/bookingValidation";

class BookingController {
  static async getAllBookings(req, res) {
    try {
      const result = await BookingService.getAllBookings(req, res);
      return res.status(result.type ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message });
    }
  }

  static async getBookingById(req, res) {
    try {
      const result = await BookingService.getBookingById(req, res);
      return res.status(result.type ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message });

    }
  }

  static async createBooking(req, res) {
    try {
      const { error } = createBookingValidation(req.body);
      if (error) {
        return res.status(400).json({ type: false, message: error.details[0].message });
      }

      const result = await BookingService.createBooking(req, res);
      return res.status(result.type ? 201 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message });
    }
  }

  static async updateBooking(req, res) {
    try {
      const { error } = updateBookingValidation(req.body);
      if (error) {
        return res.status(400).json({ type: false, message: error.details[0].message });
      }
      const result = await BookingService.updateBooking(req, res);
      return res.status(result.type ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message });
    }
  }

  static async deleteBooking(req, res) {
    try {
      const result = await BookingService.deleteBooking(req, res);
      return res.status(result.type ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message });
    }
  }
}


export default BookingController;