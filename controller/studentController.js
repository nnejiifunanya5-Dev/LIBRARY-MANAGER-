const express = require("express");
const Student = require("../models/student");


exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.createStudent = async (req, res) => {
    try {
        const { name, email, number, schoolId, department } = req.body;

        // Optional: prevent duplicate schoolId
        const existingStudent = await Student.findOne({ schoolId });

        if (existingStudent) {
            return res.status(400).json({
                message: "Student with this school ID already exists",
            });
        }

        const student = new Student({
            name,
            email,
            number,
            schoolId,
            department,
        });

        const savedStudent = await student.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};