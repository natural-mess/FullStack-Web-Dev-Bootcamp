import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { render } from "ejs";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const url = "https://www.themealdb.com/api/json/v1/1";

let cachedIngredients = [];

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${url}/list.php?i=list`);
    cachedIngredients = response.data.meals;
    res.render("index.ejs", { ingredients: cachedIngredients });
  } catch (err) {
    console.error("Failed to preload ingredients:", err.message);
  }
});

app.post("/search", async (req, res) => {
  try {
    const response = await axios.get(`${url}/filter.php?i=${req.body.ingredients}`);
    const meal = response.data.meals;
    if (!meal || meal.length === 0) {
      return res.render("recipe.ejs", {
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
    mealData.strYoutube = mealData.strYoutube.replace("watch?v=", "embed/");
    res.render("recipe.ejs", {
      ingredientDetail,
      data: mealData,
    });
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    res.status(500).send("Error fetching data");
  }
});

app.post("/random", async (req, res) => {
  try {
    const response = await axios.get(`${url}/random.php`);
    const mealData = response.data.meals[0];
    let ingredientDetail = [];
    let count = 1;
    while (mealData[`strIngredient${count}`]) {
      const ingredient = mealData[`strIngredient${count}`];
      const measure = mealData[`strMeasure${count}`];
      ingredientDetail.push({ ingredient, measure });
      count++;
    }
    mealData.strYoutube = mealData.strYoutube.replace("watch?v=", "embed/");
    res.render("recipe.ejs", {
      ingredientDetail,
      data: mealData,
    });
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
