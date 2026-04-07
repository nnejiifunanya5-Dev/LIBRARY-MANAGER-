const express = require("express");
const mongoose = require("mongoose");

// Schema for library attendants
const attendantSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true },
    email: {type: String, required: true,  unique: true, lowercase: true},
    phone: {type: String},
    employeeId: {type: String, required: true, unique: true},
    role: {type: String,
        enum: ["admin", "staff"],
         default: "staff"
    }
},
    {
        timestamps: true
    });

const attendant = mongoose.model("Attendant", attendantSchema);

module.exports = attendant; 