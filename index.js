const express = require("express");
const path = require("path");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const db = require("./db");
const fs = require("fs");
const resultRoutes = require("./routes/result");  // adjust path
// const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse form and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
const uploadPath = path.join(__dirname, "public", "uploads");
app.use("/uploads", express.static("public/uploads"));  // ✅ necessary for serving images
app.use("/", resultRoutes);


// Express-session setup
app.use(
  session({
    secret: "mySecretKey123",
    resave: false,
    saveUninitialized: false,
  })
);

// Authentication Middleware
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
}


// ensure directory exists to save multer image
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Routes
app.use("/", authRoutes); // login, signup, logout

// upload
const uploadRoute = require("./routes/upload");
app.use("/", uploadRoute); // or app.use("/api", uploadRoute);


app.get("/", (req, res) => {
  res.render("home", { user: req.session.user });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/learn", (req, res) => {
  res.render("learn");
});

app.get("/upload", isAuthenticated, (req, res) => {
  res.render("upload");
});

app.get("/result", isAuthenticated, (req, res) => {
  res.render("result");
});


// get request to auth routes
app.get("/login",(req,res)=>{
  res.render("login.ejs")
})
app.get("/register",(req,res)=>{
  res.render("register.ejs")
})

// function isAuthenticated(req, res, next) {
//   if (req.session.user) {
//     return next();
//   }
//   res.redirect("/login");
// }


app.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.session.user });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
