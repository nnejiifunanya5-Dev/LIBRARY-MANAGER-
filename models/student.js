const express = require("express");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String },
        number: { type: String },
        schoolId: { type: String, required: true },
        department: { type: String, required: true },

        // Optional: remove if not needed
        
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],

    },
    { timestamps: true }
);
const student = mongoose.model("Student", studentSchema)

module.exports = student;
