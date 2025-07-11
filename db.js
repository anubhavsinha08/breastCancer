const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sinha@123",
  database: "cancerDB"
});

connection.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to MySQL");

  // ✅ IMPROVEMENT: Create usr_data table if not exists
  const createUsrDataTable = `
    CREATE TABLE IF NOT EXISTS usr_data (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      name VARCHAR(255),
      age INT,
      patient_id INT UNIQUE,
      gender VARCHAR(30),
      mammogram_path VARCHAR(255),
      ultrasound_path VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;
  
  connection.query(createUsrDataTable, err => {
    if (err) {
      console.error("❌ Failed to create usr_data table:", err);
    } else {
      console.log("✅ usr_data table is ready.");
    }
  });
});

module.exports = connection;
