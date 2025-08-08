import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

// Creates an Express application instance.
const app = express();
// Sets the port number the server will listen on.
const port = 3000;

// Adds middleware to parse URL-encoded form data from requests.
app.use(bodyParser.urlencoded({ extended: true }));
// Serves static files (like HTML, CSS, JS) from the "public" directory.
app.use(express.static("public"));

// The URL pattern to access book covers is:
// https://covers.openlibrary.org/b/$key/$value-$size.jpg
// Source: https://openlibrary.org/dev/docs/api/covers
const API_URL = "https://covers.openlibrary.org/b/isbn";

// database information
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "booknote",
  password: "1",
  port: 5432,
});
// Start connecting to db
db.connect();

// Initialize array for all book notes
var books = [];
var error = "";
var errorEdit = "";
var temp_book = {};

// Get data from db
app.get("/", async (req, res) => {
  const sortType = req.query.sort;
  var result;
  try {
    switch (sortType) {
      case "recency":
        result = await db.query("SELECT * FROM books ORDER BY date DESC");
        break;

      case "rating":
        result = await db.query("SELECT * FROM books ORDER BY rating DESC");
        break;

      case "title":
        result = await db.query("SELECT * FROM books ORDER BY name ASC");
        break;

      case "lastUpdate":
        result = await db.query("SELECT * FROM books ORDER BY updated_at DESC");
        break;

      default:
        result = await db.query("SELECT * FROM books ORDER BY id ASC"); // default order
    }
    books = result.rows;
    res.render("index.ejs", {
      books,
    });
  } catch (err) {
    console.log(err);
  }
});

// Create new book note
// If ISBN is invalid, website will ask user to correct ISBN
app.get("/new", (req, res) => {
  if (error.length > 0) {
    res.render("new.ejs", {
      heading: "New Note",
      submit: "Create Note",
      error,
      temp_book,
    });
    error = "";
    temp_book = "";
  } else {
    res.render("new.ejs", {
      heading: "New Note",
      submit: "Create Note",
    });
  }
});

// Add new book note to database when clicking submit
// Also check if ISBN is valid, if not, prompt user to try again
app.post("/new", async (req, res) => {
  var isbn = req.body.isbn;
  var name = req.body.bookName;
  var author = req.body.author;
  var rating = req.body.rating;
  var note = req.body.note;
  try {
    await axios.get(`${API_URL}/${isbn}-M.jpg?default=false`);
    try {
      await db.query(
        "INSERT INTO books (isbn, name, author, rating, note) VALUES ($1, $2, $3, $4, $5)",
        [isbn, name, author, rating, note]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    // console.log(err);
    // ISBN is invalid
    error = "ISBN not found";
    temp_book = { isbn, name, author, rating, note };
    console.log(temp_book);
    res.redirect("/new");
  }
});

// View book note in detail
app.get("/view/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [
      req.params.id,
    ]);
    var book = result.rows[0];
    res.render("view.ejs", {
      book,
    });
  } catch (err) {
    console.log(err);
  }
});

// Fetch current data from selected book note for editing
// If ISBN is invalid, website will ask user to correct ISBN
app.get("/edit/:id", async (req, res) => {
  if (errorEdit.length > 0) {
    var book = temp_book;
    res.render("new.ejs", {
      book,
      heading: "Edit Note",
      submit: "Update Note",
      errorEdit,
    });
    errorEdit = "";
    temp_book = "";
  } else {
    try {
      const result = await db.query("SELECT * FROM books WHERE id = $1", [
        req.params.id,
      ]);
      var book = result.rows[0];
      res.render("new.ejs", {
        book,
        heading: "Edit Note",
        submit: "Update Note",
      });
    } catch (err) {
      console.log(err);
    }
  }
});

// Edit book note and update database
// If ISBN is invalid, website will ask user to correct ISBN
app.post("/edit/:id", async (req, res) => {
  var isbn = req.body.isbn;
  var name = req.body.bookName;
  var author = req.body.author;
  var rating = req.body.rating;
  var note = req.body.note;
  var bookId = req.params.id;
  try {
    await axios.get(`${API_URL}/${isbn}-M.jpg?default=false`);
    try {
      await db.query(
        "UPDATE books SET isbn = $1, name = $2, author = $3, rating = $4, note = $5, updated_at = NOW() WHERE id = $6;",
        [isbn, name, author, rating, note, bookId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    // ISBN is invalid
    errorEdit = "ISBN not found";
    temp_book = { isbn, name, author, rating, note, id:bookId };
    // console.log(temp_book);
    res.redirect(`/edit/${bookId}`);
  }
});

// Confirmation before delete a note
app.get("/delete/:id", async (req, res) => {
  var bookId = req.params.id;
  try {
    const result = await db.query("SELECT name FROM books WHERE id = $1", [
      bookId,
    ]);
    var bookName = result.rows[0].name;
    res.render("delete.ejs", {
      bookName,
      bookId,
      heading: "Delete Note",
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete a note from database if user confirms
app.post("/delete/:id", async (req, res) => {
  var bookId = req.params.id;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [bookId]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
