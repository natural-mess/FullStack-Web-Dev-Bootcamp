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
  database: "permalist",
  password: "1",
  port: 5432,
});
db.connect();

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

async function getAllItems() {
  try {
    const result = await db.query(
    "SELECT * FROM items ORDER BY id ASC"
  );
  return result.rows;
  } catch (err) {
    console.log(err);
  }
}

app.get("/", async (req, res) => {
  items = await getAllItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query(
      "INSERT INTO items (title) VALUES ($1);",
      [item]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const item = req.body;
  // console.log(item);
  try {
    await db.query(
      "UPDATE items SET title = $1 WHERE id = $2;",
      [item.updatedItemTitle, item.updatedItemId]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const item = req.body;
  try {
    await db.query(
      "DELETE FROM items WHERE id = $1;",
      [item.deleteItemId]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
