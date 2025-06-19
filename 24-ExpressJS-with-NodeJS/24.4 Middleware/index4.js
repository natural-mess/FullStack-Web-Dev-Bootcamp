import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
// import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName;

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("combined"));

function bandNameGenerator(req, res, next) {
  // console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next();
}

app.use(bandNameGenerator);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  // console.log(req.body['street']);
  console.log(req.body);
  res.send("<h1>Your band name is:</h1><h2>" + bandName + "✌️" + "</h2>");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
