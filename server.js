require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/database");

const authorRoute = require("./route/authorRoute");
const studentRoute = require("./route/studentRoute");
const attendantRoute = require("./route/attendantRoute");
const bookRoute = require("./route/bookRoute");

const app = express();

// Middlewar
app.use(express.json());
connectDB();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB error:", err));


app.use("/api/authors", authorRoute);
app.use("/api/students", studentRoute);
app.use("/api/attendants", attendantRoute);
app.use("/api/books", bookRoute);

app.get("/", (req, res) => {
    res.send("Library API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});