const Room = require("../models/room");

class ROOM_MANAGER {
  // methode for creating room
  async createRoom(roomData) {
    try {
      const newRoom = new Room({
        ...roomData,
      });
      return await newRoom.save();
    } catch (err) {
      if (err.message.indexOf("duplicate key error") !== -1) {
        err.message =
          "A room already has this codename, choose another codename";
      }
      throw err;
    }
  }

  // Method for editing room
  async editRoom(id, newData) {
    try {
      return await Room.findOneAndUpdate({ _id: id }, newData);
    } catch (err) {
      if (err.message.indexOf("duplicate key error") !== -1) {
        err.message =
          "A room already has this codename, choose another codename";
      }
      throw err;
    }
  }

  // Method for deleting room
  async deleteRoom(id) {
    try {
      return await Room.findOneAndDelete({ _id: id });
    } catch (err) {
      throw err;
    }
  }

  // Method for fetching one room
  async findRoom(id) {
    try {
      return await Room.findOne({ _id: id }).lean();
    } catch (err) {
      throw err;
    }
  }

  // Method for fetching all rooms
  async getAllRooms() {
    try {
      return await Room.find().lean();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new ROOM_MANAGER();
