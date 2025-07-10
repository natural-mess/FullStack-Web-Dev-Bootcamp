import express from 'express'
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const app = express();
const port = 3000;

// Make moment available in all EJS templates
app.locals.moment = moment;

function escapeHtml(unsafe) {
  if (!unsafe) return ""; // Avoid calling .replace on undefined/null
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

let dict = new Map();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    const blogs = Array.from(dict.entries()).map(([id, blog]) => ({
    id,
    ...blog
    }));
    res.render("index.ejs", { blogs });
});

app.get("/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/view", (req, res) => {
    const { title, text } = req.body;
    const id = uuidv4();

    const blogData = {
        title: title,
        text: escapeHtml(text).replace(/\r?\n/g, '<br>')
    };
    dict.set(id, blogData);
    // res.render("view.ejs", {data: blogData});
    res.redirect(`/blog/${id}`);
});

app.get("/blog/:id", (req, res) => {
    const id = req.params.id;
    const blog = dict.get(id);

    res.render("view.ejs", {data: blog});
});

app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const blog = dict.get(id);

    res.render("edit.ejs", {data: blog, id: id});
});

app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const { title, text } = req.body;

    const contentWithBr = escapeHtml(text).replace(/\r?\n/g, '<br>');

    dict.set(id, { title, text: contentWithBr });

    res.redirect(`/blog/${id}`);
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    const blog = dict.get(id);
    // dict.delete(id);
    res.render("delete.ejs", {data: blog, id: id});
});

app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    dict.delete(id);
    res.redirect(`/`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

