require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", resumeRoutes);

app.use((req, res) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render("500", {
    pageTitle: "Server Error",
    message: "Something went wrong while loading the resume. Check the server terminal and MongoDB connection."
  });
});

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Resume website is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Server could not start: ${error.message}`);
    process.exit(1);
  }
}

startServer();
