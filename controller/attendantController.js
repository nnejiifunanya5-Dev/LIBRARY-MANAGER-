const express = require("express");
const Attendant = require("../models/attendant");


exports.getAttendants = async (req, res) => {
    try {
        const attendants = await Attendant.find();
        res.status(200).json(attendants);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getAttendantById = async (req, res) => {
    try {
        const attendant = await Attendant.findById(req.params.id);

        if (!attendant) {
            return res.status(404).json({ message: "Attendant not found" });
        }
        res.status(200).json(attendant);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createAttendant = async (req, res) => {
    try {
        const { name, email, phone, employeeId, role } = req.body;

        const existingAttendant = await Attendant.findOne({
            $or: [{ email }, { employeeId }],
        });

        if (existingAttendant) {
            return res.status(400).json({
                message: "Employee ID or email already exists",
            });
        }

        const attendant = new Attendant({
            name,
            email,
            phone,
            employeeId,
            role,
        });

        const savedAttendant = await attendant.save();
        res.status(201).json(savedAttendant);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateAttendant = async (req, res) => {
    try {
        const updatedAttendant = await Attendant.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedAttendant) {
            return res.status(404).json({ message: "Attendant not found" });
        }

        res.status(200).json(updatedAttendant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteAttendant = async (req, res) => {
    try {
        const attendant = await Attendant.findByIdAndDelete(req.params.id);

        if (!attendant) {
            return res.status(404).json({ message: "Attendant not found" });
        }

        res.status(200).json({ message: "Attendant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
