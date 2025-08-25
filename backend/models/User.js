const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "head", "worker", "admin"],
    default: "user",
  },
  department: {
    type: String,
    enum: ["road", "water", "electricity", "waste", "drainage", "other"],
    default: "other",
  },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  lastActive: { type: Date, default: Date.now },

  // Worker-specific fields
  assignedComplaints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
    },
  ],
  completedComplaints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
    },
  ],
  workStatus: {
    type: String,
    enum: ["available", "busy", "on-break", "offline"],
    default: "available",
  },
  workLocation: {
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String },
  },
  specializations: [{ type: String }],
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  performanceMetrics: {
    totalCompleted: { type: Number, default: 0 },
    averageCompletionTime: { type: Number, default: 0 }, // in hours
    currentWeekCompleted: { type: Number, default: 0 },
    customerRating: { type: Number, default: 4.5 },
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
