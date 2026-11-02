require("dotenv").config();
const mongoose = require("mongoose");
const Resume = require("../models/Resume");

const resumeData = {
  slug: "pankaj-priyanshu",
  personalInfo: {
    fullName: "Pankaj Priyanshu",
    initials: "PP",
    title: "Software Application Development Student",
    email: "ppriyanshu015@gmail.com",
    phone: "+91 7905775991",
    location: "Varanasi, India",
    summary: "Motivated software application development student with a foundation in C, C++, Python, HTML, CSS, and R. Currently pursuing an M.Voc in Software Application Development at Cochin University of Science and Technology. Interested in mobile application development using Flutter and eager to contribute to innovative software projects while continuously improving technical skills."
  },
  education: [
    {
      degree: "Master of Vocation (M.Voc)",
      specialization: "Software Application Development",
      institution: "Cochin University of Science and Technology",
      period: "Expected 2028",
      result: "Currently pursuing",
      status: "Pursuing"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      specialization: "",
      institution: "Amity University",
      period: "2020 – 2023",
      result: "CGPA: 7.54",
      status: "Completed"
    }
  ],
  technicalSkills: ["C", "C++", "Python", "HTML", "CSS", "R"],
  softSkills: ["Problem Solving", "Teamwork", "Communication", "Time Management", "Analytical Thinking"],
  // Add verified project and certification details here when available.
  projects: [],
  certifications: [],
  interests: ["Reading", "Writing", "Solving coding problems", "Reading technology blogs", "Learning new programming languages", "Mobile application development using Flutter"],
  languages: ["English", "Hindi"]
};

async function seedDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing. Copy .env.example to .env and configure it first.");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    const savedResume = await Resume.findOneAndUpdate(
      { slug: resumeData.slug },
      { $set: resumeData },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    console.log(`Resume data saved to MongoDB for: ${savedResume.personalInfo.fullName}`);
    console.log(`Education records: ${savedResume.education.length}`);
    console.log(`Technical skills: ${savedResume.technicalSkills.length}`);
    console.log(`Projects: ${savedResume.projects.length}`);
    console.log(`Certifications: ${savedResume.certifications.length}`);
  } catch (error) {
    console.error("Could not seed MongoDB:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
