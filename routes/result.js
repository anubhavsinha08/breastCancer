const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/result", (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  const { pid } = req.query;
  if (!pid) return res.status(400).send("Missing patient ID");

  db.query("SELECT * FROM usr_data WHERE patient_id = ?", [pid], (err, results) => {
    if (err) return res.status(500).send("Database error");
    if (results.length === 0) return res.status(404).send("Patient not found");

    const data = results[0];
    const result = req.session.result;
    console.log(result)
    console.log(data)
    // delete req.session.result;  // Optional: Clear result from session after showing once

    if (!result) {
      return res.status(400).send("Prediction result not found in session.");
    }

    res.render("result", { data, result });
  });
});


module.exports = router;
