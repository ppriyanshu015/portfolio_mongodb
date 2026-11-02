const express = require("express");
const Resume = require("../models/Resume");

const router = express.Router();
const RESUME_SLUG = "pankaj-priyanshu";

// Read the resume from MongoDB and render it with EJS.
router.get("/", async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ slug: RESUME_SLUG }).lean();

    if (!resume) {
      return res.status(404).render("setup-needed", {
        pageTitle: "Resume data not found",
        message: "The resume record is not in MongoDB yet. Run the seed command described in README.md."
      });
    }

    res.render("index", {
      pageTitle: `${resume.personalInfo.fullName} | Resume`,
      resume
    });
  } catch (error) {
    next(error);
  }
});

// Optional JSON endpoint: useful for checking the data returned from MongoDB.
router.get("/api/resume", async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ slug: RESUME_SLUG }).lean();
    if (!resume) return res.status(404).json({ message: "Resume record not found" });
    res.json(resume);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
