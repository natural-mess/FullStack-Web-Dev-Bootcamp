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

let cachedIngredients = [];

async function preloadIngredients() {
  try {
    const res = await axios.get(`${url}/list.php?i=list`);
    cachedIngredients = res.data.meals;
  } catch (err) {
    console.error("Failed to preload ingredients:", err.message);
  }
}

app.get("/", async (req, res) => {
  try {
    res.render("index.ejs", { ingredients: cachedIngredients });
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    res.status(500).send("Error fetching data");
  }
});

app.post("/", async (req, res) => {
  try {
    const response = await axios.get(
      `${url}/filter.php?i=${req.body.ingredients}`
    );
    const meal = response.data.meals;
    if (!meal || meal.length === 0) {
      return res.render("recipe.ejs", {
        ingredients: cachedIngredients,
        ingredientDetail: [],
        data: null,
        error: "No meals found for the given ingredient.",
      });
    }

    const randomMeal = Math.floor(Math.random() * meal.length);
    const selectMeal = await axios.get(
      `${url}/lookup.php?i=${meal[randomMeal].idMeal}`
    );
    const mealData = selectMeal.data.meals[0];
    let ingredientDetail = [];
    let count = 1;
    while (mealData[`strIngredient${count}`]) {
      const ingredient = mealData[`strIngredient${count}`];
      const measure = mealData[`strMeasure${count}`];
      ingredientDetail.push({ ingredient, measure });
      count++;
    }
    res.render("recipe.ejs", {
      ingredients: cachedIngredients,
      ingredientDetail,
      data: mealData,
    });
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    res.status(500).send("Error fetching data");
  }
});

async function startServer() {
  await preloadIngredients(); // wait for data to load first

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
