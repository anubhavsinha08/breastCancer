const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/result", (req, res) => {
  const { pid } = req.query;

  if (!pid) return res.status(400).send("Missing patient ID");

  const sql = "SELECT * FROM usr_data WHERE patient_id = ?";
  db.query(sql, [pid], (err, results) => {
    if (err) return res.status(500).send("DB error");
    if (results.length === 0) return res.status(404).send("Patient not found");

    const data = results[0];
    res.render("result", { data });  // 🔥 This makes `data` available in result.ejs
  });
});

module.exports = router;
