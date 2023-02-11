require('dotenv/config');

const DATABASE = {
    MONGO_URI: process.env.MONGO_URI
}

const SCHEMAS = {
    ROOM_SCHEMA: 'room'
}

module.exports = { DATABASE, SCHEMAS }