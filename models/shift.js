const mongoose = require("mongoose");

const ShiftSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  employee: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  madeBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tradeable: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Shift", ShiftSchema);
