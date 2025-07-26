import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "1",
  port: 5432,
});

db.connect();

async function visited() {
  var countries_db = await db.query("SELECT country_code FROM visited_country");
  var countries = [];
  countries_db.rows.forEach((element) => {
    countries.push(element.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.
  var countries = await visited();
  res.render("index.ejs", { countries, total: countries.length });
  // db.end();
});

// app.post("/add", async (req, res) => {
//   var countries_db = await db.query("SELECT * FROM countries");
//   if (req.body.country.length != 0) {
//     var found_country = countries_db.rows.find(
//       (country) =>
//         country.country_name.toLowerCase() === req.body.country.toLowerCase()
//     );
//     if (found_country) {
//       var visited_country_db = await db.query("SELECT * FROM visited_country");
//       var found_visited_country = visited_country_db.rows.find(
//         (country) =>
//           country.country_code.toLowerCase() ===
//           found_country.country_code.toLowerCase()
//       );
//       if (!found_visited_country) {
//         console.log(found_country.country_code);
//         var add_visited = await db.query(
//           "INSERT INTO visited_country (country_code) VALUES ($1)",
//           [found_country.country_code]
//         );
//         res.redirect("/");
//       } else {
//         console.log("Country is already added");
//       }
//     } else {
//       console.log("Invalid country name");
//     }
//   }
// });

app.post("/add", async (req, res) => {
  try {
    var countries_db = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [req.body.country.toLowerCase()]
    );
    var countryCode = countries_db.rows[0].country_code;
    try {
      await db.query("INSERT INTO visited_country (country_code) VALUES ($1)", [
        countryCode,
      ]);
      res.redirect("/");
    } catch (err) {
      console.log(err);
      var countries = await visited();
      res.render("index.ejs", {
        error: "Country has been added, try again",
        countries,
        total: countries.length,
      });
    }
  } 
  catch (err) {
    console.log(err);
    var countries = await visited();
    res.render("index.ejs", {
      error: "Invalid country name, try again",
      countries,
      total: countries.length,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
