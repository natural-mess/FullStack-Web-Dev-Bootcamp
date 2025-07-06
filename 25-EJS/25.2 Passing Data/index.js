import express from "express";
import bodyParser from "body-parser";
import { name } from "ejs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  var welcomeH1 = "Enter your name below 👇";
  var data = {
    htmlContent: welcomeH1,
  }
  res.render("index.ejs", data);
});

app.post("/submit", (req, res) => {
  var nameCnt = req.body["fName"].length + req.body["lName"].length;
  var resultH1 = "There are " + nameCnt + " letters in your name.";
  var data = {
    // count: nameCnt,
    htmlContent: resultH1,
  };
  res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
