const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

router.post("/getDetailedData", async (req, res) => {
  console.log(req.body.query);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "saurav@7042",
    database: "crime_raw_data",
  });

  const [rows, fields] = await connection.query(req.body.query);
  res.send(rows);
});

module.exports = router;
