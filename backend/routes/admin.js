const express = require("express");
const Attendance = require("../models/Attendance");
const User = require("../models/User");
const { verifyAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/users", verifyAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.put("/user/:id", verifyAdmin, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "User details updated" });
});

router.get("/attendance", verifyAdmin, async (req, res) => {
  const { userId, date } = req.query;
  try {
    const attendance = await Attendance.find({ userId, date });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/attendance", verifyAdmin, async (req, res) => {
  const { userId, date, status } = req.body;
  try {
    const existingRecord = await Attendance.findOne({ userId, date });

    if (existingRecord) {
      existingRecord.status = status;
      await existingRecord.save();
      return res.json({ message: "Attendance updated" });
    }

    const newAttendance = new Attendance({ userId, date, status });
    await newAttendance.save();
    res.json({ message: "Attendance added" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/attendance/all", verifyAdmin, async (req, res) => {
  const { userId } = req.query;
  try {
    const attendanceRecords = await Attendance.find({ userId }).sort({
      date: -1,
    });
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/attendance/:id", verifyAdmin, async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ message: "Attendance deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
