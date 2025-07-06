import express from "express";
// import ejs from "ejs";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import bodyParser from "body-parser";

// const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var today = new Date();

app.get("/", (req, res) => {
  var action, date;
  var weekday = today.getDay();
  if (weekday > 0 && weekday < 6) {
    action = "work hard";
    date = "weekday";
  } else {
    action = "have fun";
    date = "weekend";
  }
  res.render("index.ejs", { date: date, action: action });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
