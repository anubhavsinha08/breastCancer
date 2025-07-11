const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");
const router = express.Router();

const app = express();

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Register Route
router.post("/register", async (req, res) => {
    const { name, email, password, age, gender } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error registering user");
        }
        res.redirect("/login");
    });
});

// Login Route
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Login input:", email, password);

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).send("Database error");
        }

        if (results.length === 0) {
            console.log("User not found for:", email);
            return res.status(401).send("Invalid credentials");
        }

        const user = results[0];
        console.log("User fetched:", user);

        const match = await bcrypt.compare(password, user.password);
        console.log("Password match result:", match);

        if (!match) return res.status(401).send("Incorrect password");
        req.session.isAuthenticated = true;

        // req.session.user = user;
        req.session.user = {
            id: user.id,
            name: user.name, // assuming your DB column is 'name'
            email: user.email
        };
        res.redirect("/");
    });
});


// Logout Route
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send("Error logging out.");
        res.redirect("/");
    });
});

module.exports = router;
