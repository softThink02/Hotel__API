const RoomHelpers = require("../utils/room.handlers");

exports.AddRoom = async (req, res, next) => {
  const { codeName, price, roomType } = req.body;
  try {
    // Check to see if the body's contents are not empty
    if (codeName === "" || price === "" || roomType === "") {
      throw new Error("codeName, price or roomType must not be empty!");
    }

    // Validating the roomType query...
    if (
      !(
        roomType === "Premium" ||
        roomType === "Standard" ||
        roomType === "Economic"
      )
    ) {
      throw new Error(
        "room type must either be `Premium, Standard or Economic!`."
      );
    }
    const newRoom = await RoomHelpers.createRoom({
      codeName,
      price,
      roomType,
    });
    newRoom &&
      res
        .status(200)
        .json({ message: "Room successfully created.", data: newRoom._doc });
  } catch (err) {
    next(err);
  }
};

exports.EditRoom = async (req, res, next) => {
  const { roomId } = req.params;
  const { codeName, price, roomType } = req.body;
  try {
    if (!roomId || roomId === "") {
      throw new Error("parameter `roomId` is required!");
    }
    if (
      !(codeName && price && roomType) ||
      codeName === "" ||
      price === "" ||
      roomType === ""
    ) {
      throw new Error("codeName, price or roomType must not be empty!");
    }

    // Validating the roomType query...
    if (
      !(
        roomType === "Premium" ||
        roomType === "Standard" ||
        roomType === "Economic"
      )
    ) {
      throw new Error(
        "room type must either be `Premium, Standard or Economic!`."
      );
    }

    const editedRoom = await RoomHelpers.editRoom(roomId, {
      codeName,
      price,
      roomType
    });
    editedRoom &&
      res
        .status(200)
        .json({ message: "Room successfully edited.", data: editedRoom._doc });
  } catch (err) {
    next(err);
  }
};

exports.DeleteRoom = async (req, res, next) => {
  const { roomId } = req.params;
  try {
    if (!roomId || roomId === "") {
      throw new Error("parameter `roomId` is required!");
    }
    const deleteFeedBack = await RoomHelpers.deleteRoom(roomId);
    deleteFeedBack &&
      res.status(200).json({ message: "Room successfully deleted." });
  } catch (err) {
    next(err);
  }
};

exports.GetOneRoom = async (req, res, next) => {
  const { roomId } = req.params;
  try {
    if (!roomId || roomId === "") {
      throw new Error("parameter `roomId` is required!");
    }
    const roomInfo = await RoomHelpers.findRoom(roomId);
    roomInfo && res.status(200).json({ data: roomInfo });
  } catch (err) {
    next(err);
  }
};

exports.GetAllRooms = async (req, res) => {
  try {
    const rooms = await RoomHelpers.getAllRooms();
    rooms && res.status(200).json({ data: rooms });
  } catch (err) {
    next(err);
  }
};
