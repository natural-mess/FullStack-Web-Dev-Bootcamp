import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "1",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisisted(user_id) {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1",
    [user_id]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function findColor(user_id) {
  const result = await db.query(
    "SELECT color FROM users WHERE id = $1",
    [user_id]
  );
  return result.rows[0].color;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted(currentUserId);
  const color = await findColor(currentUserId);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  try {
    const join_db = await db.query(
      "SELECT * FROM users JOIN visited_countries ON users.id = visited_countries.user_id WHERE users.id = $1",
      [req.body.user]
    );
    currentUserId = join_db.rows[0].user_id;
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
