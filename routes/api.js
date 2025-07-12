const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");
const router = express.Router();

// ✅ API: Register
router.post("/api/register", async (req, res) => {
  const { name, email, password, age, gender } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO users (name, email, password, age, gender) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, email, hashedPassword, age, gender], (err) => {
    if (err) return res.status(500).json({ error: "User already exists or invalid data" });
    res.status(200).json({ message: "User registered successfully" });
  });
});

// ✅ API: Login
router.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: "Invalid credentials" });
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Wrong password" });

    req.session.user = user;
    res.status(200).json({ message: "Login successful", user });
  });
});

// ✅ API: Dashboard
router.get("/api/dashboard", (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: "Unauthorized" });
  res.status(200).json({ user: req.session.user });
});

// ✅ API: Upload (save report data to DB)
router.post("/api/upload", (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: "Unauthorized" });

  const { report_details } = req.body;
  const sql = "UPDATE usr_data SET report_details = ? WHERE id = ?";
  db.query(sql, [report_details, req.session.user.id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to save report" });

    // Update session value too
    req.session.user.report_details = report_details;
    res.status(200).json({ message: "Report uploaded successfully" });
  });
});

// router.post("/upload",(req,res)=>{
//   console.log(usr_data.name)
// })

// ✅ Logout
router.get("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "Logged out" });
  });
});


module.exports = router;
