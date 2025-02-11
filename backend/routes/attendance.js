const express = require("express");
const Attendance = require("../models/Attendance");
const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, status } = req.body;
  const attendance = new Attendance({ userId, status });
  await attendance.save();
  
  res.json({ message: "Attendance marked" });
});

router.get("/:userId", async (req, res) => {
  const attendance = await Attendance.find({ userId: req.params.userId });
  res.json(attendance);
});

module.exports = router;
