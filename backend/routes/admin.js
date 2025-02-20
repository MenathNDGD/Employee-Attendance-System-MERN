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

router.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await Attendance.deleteMany({ userId });

    res.json({
      message: "User and their attendance records deleted successfully!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete user and attendance records" });
  }
});

router.put("/users/:id/role", async (req, res) => {
  const { role } = req.body;
  if (!["admin", "employee"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update role" });
  }
});

module.exports = router;
