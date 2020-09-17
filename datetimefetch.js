const express = require("express");
const router = express.Router();
const csv = require("csv-parser");
const fs = require("fs");
const mysql = require("mysql2/promise");

// JSON_data = [];

// fs.createReadStream("raw-crime-data.csv")
//   .pipe(csv())
//   .on("data", (row) => {
//     JSON_data.push(row);
//   })
//   .on("end", () => {
//     console.log("CSV file successfully processed");

//     const connection = mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "saurav@7042",
//       database: "crime_raw_data",
//     });
//     connection.connect();
//     JSON_data.slice(700000).map((oneRow, index) => {
//       // log
//       let sql = "INSERT INTO data_table SET ?";
//       connection.query(sql, oneRow, (err, result) => {
//         if (err) {
//           console.log("error", index);
//         }
//         console.log("done", index);
//       });

//       // connection.end();
//     });
//   });

const sqlconnectiondata = {
  host: "localhost",
  user: "root",
  password: "saurav@7042",
  database: "crime_raw_data",
};

const getCrimesByDate = async (dates) => {
  console.log(dates, "qeuried");
  const connection = await mysql.createConnection(sqlconnectiondata);
  sql = `SELECT offense_group,count(*) FROM crime_raw_data.data_table where occurred_date between ${dates.start} and ${dates.end} group by offense_group;`;
  const [rows, fields] = await connection.execute(sql);

  let unique_crimes = {
    NonFatalShooting: 0,
    Homicide: 0,
    AggAssault: 0,
  };

  rows.map((x) => {
    switch (x.offense_group) {
      case "Non-Fatal Shooting":
        unique_crimes.NonFatalShooting += x["count(*)"];
        break;
      case "Homicide - Gun":
        unique_crimes.Homicide += x["count(*)"];
        break;
      case "Homicide - Other Weapon":
        unique_crimes.Homicide += x["count(*)"];
        break;
      case "Homicide - Weapon Unspecified":
        unique_crimes.Homicide += x["count(*)"];
        break;
      case "Agg Assault - Gun":
        unique_crimes.AggAssault += x["count(*)"];
        break;
      case "Agg Assault - Other Weapon":
        unique_crimes.AggAssault += x["count(*)"];
        break;
      case "Agg Assault - Weapon Unspecified":
        unique_crimes.AggAssault += x["count(*)"];
        break;

      default:
        break;
    }
  });
  console.log(unique_crimes);
  return unique_crimes;
};

const getCrimesByTime = async (hours) => {
  console.log(hours, "qeuried");
  const connection = await mysql.createConnection(sqlconnectiondata);
  sql = `SELECT offense_group,count(*) FROM crime_raw_data.data_table where occurred_time between ${hours.start} and ${hours.end} group by offense_group;`;
  const [rows, fields] = await connection.execute(sql);

  let unique_crimes = {
    NonFatalShooting: 0,
    Homicide: 0,
    AggAssault: 0,
  };

  rows.map((x) => {
    switch (x.offense_group) {
      case "Non-Fatal Shooting":
        unique_crimes.NonFatalShooting += x["count(*)"];
        break;
      case "Homicide - Gun":
        unique_crimes.Homicide += x["count(*)"];
        break;
      case "Homicide - Other Weapon":
        unique_crimes.Homicide += x["count(*)"];
        break;
      case "Homicide - Weapon Unspecified":
        unique_crimes.Homicide += x["count(*)"];
        break;
      case "Agg Assault - Gun":
        unique_crimes.AggAssault += x["count(*)"];
        break;
      case "Agg Assault - Other Weapon":
        unique_crimes.AggAssault += x["count(*)"];
        break;
      case "Agg Assault - Weapon Unspecified":
        unique_crimes.AggAssault += x["count(*)"];
        break;

      default:
        break;
    }
  });
  console.log(unique_crimes);
  return unique_crimes;
};

router.get("/getDateData", async (req, res) => {
  const dates = [
    { start: 1967, end: 1976 },
    { start: 1977, end: 1986 },
    { start: 1987, end: 1996 },
    { start: 1997, end: 2006 },
    { start: 2007, end: 2018 },
  ];

  let result = dates.map(async (dates, index) => getCrimesByDate(dates));

  let all_resolved = await Promise.all(result);
  res.send(all_resolved);
});

router.get("/getTimeData", async (req, res) => {
  const hours = [
    { start: 00, end: 06 },
    { start: 07, end: 12 },
    { start: 13, end: 18 },
    { start: 19, end: 24 },
  ];
  let result = hours.map(async (hours, index) => getCrimesByTime(hours));

  let all_resolved = await Promise.all(result);
  res.send(all_resolved);
});

module.exports = router;
