const express = require('express')
const cors = require("cors");
const connectDB = require("./src/utils/database")
const roomRoutes= require("./src/routes/room.route")
require("dotenv/config")

// Initialise express app
const app = express();

app.use(express.json())
app.use(cors({origin: "*"}))

app.get("/", (req, res, next) => res.send("Welcome to the API"))

app.use("/api/v1", roomRoutes)

const PORT = process.env.PORT || 3000

connectDB(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})