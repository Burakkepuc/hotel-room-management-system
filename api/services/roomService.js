import Room from '../models/roomModel';
import mongoose from 'mongoose';

class RoomService {

  static async getAllRooms(req, res) {
    try {
      const rooms = await Room.find();
      return { type: true, data: rooms, message: 'All rooms fetched' }
    } catch (error) {
      return { type: false, message: 'An error occurred getting all rooms' };
    }
  }

  static async createRoom(req, res) {
    try {
      const { number, type, price, quantity, isAvailable } = req.body;

      const room = await Room.create({ number, type, price, quantity, isAvailable })

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
      const { number, type, price, quantity, isAvailable } = req.body;

      if (!id) {
        return { type: false, message: 'Room id required ' };
      }

      const updatedRoom = await Room.updateOne(
        { _id: id },
        { number, type, price, quantity, isAvailable },
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

      const rooms = await Room.find({ type, isAvailable: true });

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