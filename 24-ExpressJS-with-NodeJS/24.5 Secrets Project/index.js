//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express"
import {dirname} from "path"
import { fileURLToPath } from "url"
import bodyParser from "body-parser"

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const truePass = "ILoveProgramming";

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/check", (req, res) => {
    console.log(req.body);
    if (req.body["password"] === truePass)
    {
        console.log("Password correct");
        res.sendFile(__dirname + "/public/secret.html");
    }
    else
    {
        console.log("Wrong password, try again");
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});