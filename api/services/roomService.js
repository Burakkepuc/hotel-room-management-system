import Room from '../models/roomModel';
import mongoose from 'mongoose';
import redisClient from '../helpers/redis'

class RoomService {



  static async getAllRooms(req, res) {
    try {
      const rooms = await Room.find();
      return { type: true, data: rooms, message: 'All rooms fetched' }
    } catch (error) {
      return { type: false, message: 'An error occurred getting all rooms' };
    }
  }

  static async getAllAvailableRoomsByDate(req, res) {
    try {
      const { startDate, endDate } = req.body;

      if (!startDate || !endDate) {
        return { success: false, message: 'Both start date and end date are required' };
      }

      const start = new Date(startDate);
      const end = new Date(endDate);


      if (start >= end) {
        return { success: false, message: 'End date must be after start date' };
      }

      const cacheKey = `rooms_${startDate}_${endDate}`;

      const cachedData = await redisClient.getCache(cacheKey);
      if (cachedData) {
        return { type: true, data: cachedData, message: 'Rooms fetched from cache' };
      }

      const availableRooms = await Room.find({
        availableDates: {
          $elemMatch: {
            start: { $gte: start },
            end: { $lte: end }
          }
        }
      });

      await redisClient.setCache(cacheKey, availableRooms);


      return { type: true, data: availableRooms, message: 'All rooms fetched' }
    } catch (error) {
      return { type: false, message: 'An error occurred getting all rooms' };
    }
  }


  static async createRoom(req, res) {
    try {
      const { number, type, price, quantity, isAvailable, availableDates } = req.body;

      const room = await Room.create({ number, type: type.toLowerCase(), price, quantity, isAvailable, availableDates })

      return { type: true, data: room, message: 'Room created successfully' }
    } catch (error) {
      if (error.name === 'ValidationError') {
        if (error.errors && error.errors.type) {
          const types = await this.getRoomTypes();
          return { type: false, message: 'Invalid room type.', types: types.data };
        }
      }
      return { type: false, message: 'An error occurred updating the room' };
    }
  }

  static async updateRoom(req, res) {
    try {
      const { id } = req.params;
      const { number, type, price, quantity, isAvailable, availableDates } = req.body;

      if (!id) {
        return { type: false, message: 'Room id required ' };
      }

      const updatedRoom = await Room.updateOne(
        { _id: id },
        { number, type: type.toLowerCase(), price, quantity, isAvailable, availableDates },
        { new: true, runValidators: true }
      );

      if (!updatedRoom) {
        return { type: false, message: 'Room not found' };
      }

      return { type: true, data: updatedRoom, message: 'Room updated successfully' };
    } catch (error) {
      if (error.name === 'ValidationError') {
        if (error.errors && error.errors.type) {
          const types = await this.getRoomTypes();
          return { type: false, message: 'Invalid room type.', types: types.data };
        }
      }
      return { type: false, message: 'An error occurred updating the room' };
    }
  }

  static async getRoomTypes(req, res) {
    try {
      const types = await Room.schema.path('type').enumValues
      return { type: true, data: types, message: `Rooms of types fetched successfully` };
    } catch (error) {
      return { type: false, message: 'An error occurred getting room types' };

    }
  }

  static async getAvailableRoomsByType(req, res) {
    try {
      const { type } = req.params;

      if (!type) {
        return { type: false, message: 'Room type is required' };
      }

      const rooms = await Room.find({ type: type.toLowerCase(), isAvailable: true });

      return { type: true, data: rooms, message: `Rooms of type ${type} fetched successfully` };
    } catch (error) {
      return { type: false, message: 'An error occurred getting rooms by type' };
    }
  }

  static async deleteRoom(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return { type: false, message: 'Room ID is required' };
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { type: false, message: 'Invalid Room ID format.' };
      }

      const deletedRoom = await Room.findByIdAndDelete(id);

      if (!deletedRoom) {
        return { type: false, message: 'Room not found' };
      }
      return { type: true, message: 'Room deleted successfully', data: deletedRoom };
    } catch (error) {
      return { type: false, message: 'An error occurred deleting the room', error: error.message };
    }
  }

}




export default RoomService;