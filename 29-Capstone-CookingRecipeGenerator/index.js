import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { render } from "ejs";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const url = "https://www.themealdb.com/api/json/v1/1";

// async function getAllOptions() {
//   const [categoriesRes, areaRes, ingredientsRes] = await Promise.all([
//     axios.get(`${url}/list.php?c=list`),
//     axios.get(`${url}/list.php?a=list`),
//     axios.get(`${url}/list.php?i=list`),
//   ]);
//   return {
//     categories: categoriesRes.data.meals,
//     area: areaRes.data.meals,
//     ingredients: ingredientsRes.data.meals,
//   };
// }

let categories, area, ingredients;

app.get("/", async (req, res) => {
  try {
    // Run all 3 requests at once
    const response = await axios.get(`${url}/list.php?i=list`);
    const data = response.data.meals;
    console.log(data);

    res.render("index.ejs", {ingredients: data});
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    res.status(500).send("Error fetching data");
  }
});

app.post("/", async (req, res) => {
  try {
    // ({ categories, area, ingredients } = await getAllOptions());
    const response = await axios.get(
      `${url}/random.php?c=${req.body.categories}&a=${req.body.area}&i=${req.body.ingredients}`
    );
    const meal = response.data.meals[0];
    let ingredientDetail = [];
    let count = 1;
    while (meal[`strIngredient${count}`]) {
      const ingredient = meal[`strIngredient${count}`];
      const measure = meal[`strMeasure${count}`];
      ingredientDetail.push({
        ingredient,
        measure,
      });
      count++;
    }
    res.render("index.ejs", {
      categories,
      area,
      ingredients,
      ingredientDetail,
      data: response.data,
    });
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
