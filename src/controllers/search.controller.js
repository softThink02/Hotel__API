const Rooms = require("../models/room");

exports.getFilteredRooms = async (req, res, next) => {
  const roomSearchQuery = req.params.searchQuery;

  try {
    /**
     * Check if the search query isn't properly constructed
     */
    if (!roomSearchQuery || roomSearchQuery === "") {
      throw new Error(
        "No search queries provided. Try searching for rooms by name, price and type"
      );
    }

    // let regex = '/^tagQuery/i';
    // regex = regex.replace('tagQuery', roomSearchQuery);
    // regex = new RegExp(regex);
    // console.log(typeof regex, regex)
    const matchedRooms = await Rooms.find({
      $or: [
        { codeName: { $regex: roomSearchQuery, $options: "i" } },
        { price: { $regex: roomSearchQuery, $options: "i" } },
        { roomType: { $regex: roomSearchQuery, $options: "i" } },
      ],
    })
      .limit(10)
      .lean();

    matchedRooms.length === 0
      ? res.status(404).json({
          message: "No results found...",
        })
      : res.status(200).json({ data: matchedRooms });
  } catch (err) {
    next(err);
  }
};
