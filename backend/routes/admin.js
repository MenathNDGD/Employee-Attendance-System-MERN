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
  const { userId, month, year } = req.query;
  const attendance = await Attendance.find({
    userId,
    date: {
      $gte: new Date(`${year}-${month}-01`),
      $lt: new Date(`${year}-${month}-31`),
    },
  });
  res.json(attendance);
});

router.post("/attendance", verifyAdmin, async (req, res) => {
  const { userId, date, status } = req.body;
  const newAttendance = new Attendance({ userId, date, status });
  await newAttendance.save();
  res.json({ message: "Attendance added" });
});

router.put("/attendance/:id", verifyAdmin, async (req, res) => {
  await Attendance.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Attendance updated" });
});

router.delete("/attendance/:id", verifyAdmin, async (req, res) => {
  await Attendance.findByIdAndDelete(req.params.id);
  res.json({ message: "Attendance deleted" });
});

module.exports = router;
