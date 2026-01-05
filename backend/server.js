import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import caseStudyRoutes from "./routes/caseStudyRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import db from "./config/db.js";

dotenv.config();
const app = express();

// ====== MIDDLEWARE ======
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ====== TEST DB CONNECTION ======
db.getConnection()
  .then(() => console.log("MySQL Connected ✔"))
  .catch((err) => console.log("DB Error:", err));

// ====== ROUTES ======d
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/case-studies", caseStudyRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/faqs", faqRoutes);

// ====== DEFAULT ROUTE ======
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ====== START SERVER ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
