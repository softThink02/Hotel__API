const express = require('express');
const router = express.Router();

const RoomControllers = require('../controllers/room.controller')
const SearchControllers = require('../controllers/search.controller')

// route for adding a room to the database
router.post('/addRoom', RoomControllers.AddRoom)

// route for editing a room in the database
router.put('/editRoom/:roomId', RoomControllers.EditRoom)

// route for deleting a room from the database
router.delete('/deleteRoom/:roomId', RoomControllers.DeleteRoom)

// route for fetching a room from the database
router.get('/getRoom/:roomId', RoomControllers.GetOneRoom)

// route for fetching all rooms from the database
router.get('/getAllRooms', RoomControllers.GetAllRooms)

// route for searching/filtering rooms in the database
router.get('/filter/:searchQuery', SearchControllers.getFilteredRooms)

module.exports = router;