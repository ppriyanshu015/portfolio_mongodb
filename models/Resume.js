const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true, trim: true },
  specialization: { type: String, trim: true, default: "" },
  institution: { type: String, required: true, trim: true },
  period: { type: String, trim: true, default: "" },
  result: { type: String, trim: true, default: "" },
  status: { type: String, trim: true, default: "Completed" }
}, { _id: false });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  technologies: [{ type: String, trim: true }],
  projectUrl: { type: String, trim: true, default: "" },
  date: { type: String, trim: true, default: "" }
}, { _id: false });

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  issuer: { type: String, trim: true, default: "" },
  issueDate: { type: String, trim: true, default: "" },
  credentialUrl: { type: String, trim: true, default: "" }
}, { _id: false });

const resumeSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  personalInfo: {
    fullName: { type: String, required: true, trim: true },
    initials: { type: String, default: "", trim: true },
    title: { type: String, default: "", trim: true },
    email: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    summary: { type: String, default: "", trim: true }
  },
  education: [educationSchema],
  technicalSkills: [{ type: String, trim: true }],
  softSkills: [{ type: String, trim: true }],
  projects: [projectSchema],
  certifications: [certificationSchema],
  interests: [{ type: String, trim: true }],
  languages: [{ type: String, trim: true }]
}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);
