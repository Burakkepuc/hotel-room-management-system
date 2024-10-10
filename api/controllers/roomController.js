import RoomService from '../services/roomService';
import { createRoomValidation, updateRoomValidation } from '../validations/roomValidation';

class RoomController {
  static async getAllRooms(req, res) {
    try {
      const result = await RoomService.getAllRooms(req, res);
      return res.status(result.type ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message });
    }
  }

  static async getAllAvailableRoomsByDate(req, res) {
    try {
      const result = await RoomService.getAllAvailableRoomsByDate(req, res);
      return res.status(result.type ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message });
    }
  }

  static async createRoom(req, res) {
    try {
      const { error } = createRoomValidation(req.body);
      if (error) {
        return res.status(400).json({ type: false, message: error.details[0].message });
      }
      const result = await RoomService.createRoom(req, res);
      return res.status(result.type ? 201 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message });
    }
  }

  static async updateRoom(req, res) {
    try {
      const { error } = updateRoomValidation(req.body);
      if (error) {
        return res.status(400).json({ type: false, message: error.details[0].message });
      }

      const result = await RoomService.updateRoom(req, res);
      return res.status(result.type ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message });
    }
  }

  static async getRoomTypes(req, res) {
    try {
      const result = await RoomService.getRoomTypes(req, res);
      return res.status(result.type ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message });
    }
  }

  static async getAvailableRoomsByType(req, res) {
    try {
      const result = await RoomService.getAvailableRoomsByType(req, res);
      return res.status(result.type ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message });
    }
  }

  static async deleteRoom(req, res) {
    try {
      const result = await RoomService.deleteRoom(req, res);
      return res.status(result.type ? 200 : 400).json(result);
    } catch (error) {
      return res.status(500).json({ type: false, message: error.message });
    }
  }
}

export default RoomController;
