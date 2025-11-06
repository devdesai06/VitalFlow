// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // make sure this exports your MySQL connection

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// 1️⃣ All Donors
app.get("/donors", (req, res) => {
  db.query("SELECT * FROM Donor", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 2️⃣ Hospitals List
app.get("/hospitals", (req, res) => {
  db.query("SELECT Hospital_Name, Contact_No, Email, Address FROM Hospital", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 3️⃣ Blood Donations
app.get("/donations", (req, res) => {
  db.query("SELECT Donation_ID, Donor_ID, BloodType_ID, Quantity_ml, Status, Donation_Date FROM Blood_Donation", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 4️⃣ Donors with Blood Group O+
app.get("/donors/o-positive", (req, res) => {
  db.query("SELECT Name, Contact_No, BloodGroup FROM Donor WHERE BloodGroup = 'O+'", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 5️⃣ Donations between 2023 and 2024
app.get("/donations/2023-2024", (req, res) => {
  db.query("SELECT * FROM Blood_Donation WHERE Donation_Date BETWEEN '2023-01-01' AND '2024-12-31'", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 6️⃣ Hospitals in Ahmedabad
app.get("/hospitals/ahmedabad", (req, res) => {
  db.query("SELECT * FROM Hospital WHERE Address LIKE '%Ahmedabad%'", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 7️⃣ Donor & Blood Type Join
app.get("/join/donor-donation", (req, res) => {
  const sql = `
    SELECT d.Name AS Donor_Name, bt.BloodGroup, bd.Quantity_ml, bd.Status
    FROM Donor d
    JOIN Blood_Donation bd ON d.Donor_ID = bd.Donor_ID
    JOIN Blood_Type bt ON bd.BloodType_ID = bt.BloodType_ID;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 8️⃣ Hospital Requests Join
app.get("/join/hospital-requests", (req, res) => {
  const sql = `
    SELECT h.Hospital_Name, bt.BloodGroup, br.Requested_Units, br.Status
    FROM Blood_Request br
    JOIN Hospital h ON br.Hospital_ID = h.Hospital_ID
    JOIN Blood_Type bt ON br.BloodType_ID = bt.BloodType_ID;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 9️⃣ Blood Distributions Join
app.get("/join/distributions", (req, res) => {
  const sql = `
    SELECT bd.Distribution_ID, h.Hospital_Name, bi.Quantity_Units, bd.Status
    FROM Blood_Distribution bd
    JOIN Blood_Request br ON bd.Request_ID = br.Request_ID
    JOIN Hospital h ON br.Hospital_ID = h.Hospital_ID
    JOIN Blood_Inventory bi ON bd.Inventory_ID = bi.Inventory_ID;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 🔟 Donor Count by Blood Group
app.get("/stats/donor-count", (req, res) => {
  const sql = `
    SELECT BloodGroup, COUNT(*) AS Total_Donors
    FROM Donor
    GROUP BY BloodGroup;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 11️⃣ Blood Inventory Levels
app.get("/stats/inventory", (req, res) => {
  const sql = `
    SELECT bt.BloodGroup, SUM(bi.Quantity_Units) AS Total_Units
    FROM Blood_Inventory bi
    JOIN Blood_Type bt ON bi.BloodType_ID = bt.BloodType_ID
    GROUP BY bt.BloodGroup;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 12️⃣ Campaign Performance
app.get("/stats/campaigns", (req, res) => {
  db.query("SELECT Campaign_Name, Collected_Units FROM Campaign ORDER BY Collected_Units DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 13️⃣ Top 5 Recent Donations
app.get("/donations/top5", (req, res) => {
  db.query("SELECT Donation_ID, Donor_ID, Donation_Date, Quantity_ml FROM Blood_Donation ORDER BY Donation_Date DESC LIMIT 5", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 14️⃣ Oldest Donors
app.get("/donors/oldest", (req, res) => {
  db.query("SELECT Name, DOB, Registration_Date FROM Donor ORDER BY Registration_Date ASC LIMIT 3", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 15️⃣ Safe Blood Availability (View)
app.get("/views/safe-blood", (req, res) => {
  const sql = `
    SELECT * FROM Safe_Blood_Availability;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ✅ Insert Donor
app.post("/insert/donor", (req, res) => {
  const { Name, Gender, DOB, BloodGroup, Contact_No, Email, Address, Registration_Date } = req.body;
  const sql = `INSERT INTO Donor (Name, Gender, DOB, BloodGroup, Contact_No, Email, Address, Registration_Date)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [Name, Gender, DOB, BloodGroup, Contact_No, Email, Address, Registration_Date], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Donor inserted successfully!" });
  });
});

// ✅ Insert Blood Type
app.post("/insert/bloodtype", (req, res) => {
  const { BloodGroup, RH_Factor, Description } = req.body;
  const sql = `INSERT INTO Blood_Type (BloodGroup, RH_Factor, Description) VALUES (?, ?, ?)`;
  db.query(sql, [BloodGroup, RH_Factor, Description], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Blood Type inserted successfully!" });
  });
});

// ✅ Insert Blood Donation
app.post("/insert/donation", (req, res) => {
  const { Donor_ID, BloodType_ID, Test_ID, Donation_Date, Quantity_ml, Status } = req.body;
  const sql = `INSERT INTO Blood_Donation (Donor_ID, BloodType_ID, Test_ID, Donation_Date, Quantity_ml, Status)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [Donor_ID, BloodType_ID, Test_ID, Donation_Date, Quantity_ml, Status], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Blood Donation inserted successfully!" });
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
