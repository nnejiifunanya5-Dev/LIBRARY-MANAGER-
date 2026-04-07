const express = require("express");
const mongoose = require("mongoose")

//calling in properties of an author
const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: String,
    dob: Date,

},
    { timestamps: true });
    const author = mongoose.model("author", authorSchema);

    module.exports = author;
