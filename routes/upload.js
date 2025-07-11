const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../db");
const router = express.Router();

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ✅ POST /upload
router.post("/upload", upload.fields([
  { name: "mammogram_path", maxCount: 1 },
  { name: "ultrasound_path", maxCount: 1 }
]), (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized");
  }

  const { id } = req.session.user;
  const { name, age, gender, patient_id } = req.body;
  const mammogram = req.files.mammogram_path?.[0]?.filename || null;
  const ultrasound = req.files.ultrasound_path?.[0]?.filename || null;

  const sql = `
    INSERT INTO usr_data (user_id, patient_id, name, age, gender, mammogram_path, ultrasound_path)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [id, patient_id, name, age, gender, mammogram, ultrasound], (err) => {
    if (err) {
      console.error("❌ Upload failed:", err);
      return res.status(500).send("Failed to upload data.");
    }

    // Redirect or render result page
    res.redirect(`/result?pid=${patient_id}`);
  });
});

module.exports = router;
