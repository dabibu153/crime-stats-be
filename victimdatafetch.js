const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const sqlconnectiondata = {
  host: "localhost",
  user: "root",
  password: "saurav@7042",
  database: "crime_raw_data",
};

const getCrimesByVage = async (agerange) => {
  console.log(agerange, "qeuried");
  const connection = await mysql.createConnection(sqlconnectiondata);
  sql = `SELECT offense_group,count(*) FROM crime_raw_data.data_table where victim_age between ${agerange.start} and ${agerange.end} group by offense_group;`;
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

const getCrimesByVrace = async (victimrace) => {
  console.log(victimrace, "qeuried");
  const connection = await mysql.createConnection(sqlconnectiondata);
  sql = `SELECT offense_group,count(*) FROM crime_raw_data.data_table where victim_race_condensed='${victimrace}' group by offense_group;`;
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

const getCrimesByVsex = async (victimsex) => {
  console.log(victimsex, "qeuried");
  const connection = await mysql.createConnection(sqlconnectiondata);
  sql = `SELECT offense_group,count(*) FROM crime_raw_data.data_table where victim_sex in ${victimsex} group by offense_group;`;
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

router.get("/getVageData", async (req, res) => {
  const agerange = [
    { start: 1, end: 10 },
    { start: 11, end: 30 },
    { start: 31, end: 60 },
    { start: 61, end: 100 },
    { start: 101, end: 120 },
  ];

  let result = agerange.map(async (agerange, index) =>
    getCrimesByVage(agerange)
  );

  let all_resolved = await Promise.all(result);
  res.send(all_resolved);
});

router.get("/getVraceData", async (req, res) => {
  const victimrace = ["OTHER/UNKNOWN", "BLACK/HISPANIC", "WHITE"];

  let result = victimrace.map(async (victimrace, index) =>
    getCrimesByVrace(victimrace)
  );

  let all_resolved = await Promise.all(result);
  res.send(all_resolved);
});

router.get("/getVsexData", async (req, res) => {
  const victimsex = [
    "('M', 'MALE')",
    "('F', 'FEMALE')",
    "('OTH', 'TRANSGENDERED','MISSING', 'UNKNOWN', 'U', 'UNCLEAR', 'UNK')",
  ];

  let result = victimsex.map(async (victimsex, index) =>
    getCrimesByVsex(victimsex)
  );

  let all_resolved = await Promise.all(result);
  res.send(all_resolved);
});

module.exports = router;
