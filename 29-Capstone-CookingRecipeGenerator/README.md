# Cooking Recipe Generator

A web application that generates cooking recipes based on ingredients you provide, or gives you a random recipe. Built with Node.js, Express, EJS, and TheMealDB API.

## Features

- Search for recipes by ingredient
- Get a random recipe suggestion
- View recipe details, including ingredients, instructions, and a YouTube video

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript templates)
- Axios (for API requests)
- TheMealDB API

## Project Structure

```
CookingRecipeGenerator/
│
├── public/ 
│ ├── img/ 
│ │ ├── home_bg.png
│ │ └── search-icon.svg
│ ├── styles/ 
│ │ └── main.css 
│
├── views/ 
│ ├── partials/ 
│ │ ├── header.ejs 
│ │ └── footer.ejs 
│ ├── index.ejs 
│ └── recipe.ejs 
│
├── index.js 
├── package.json 
└── README.md
```
## Installation

1. **Clone the repository**
```bash
git clone https://github.com/natural-mess/Cooking-Recipe-Generator.git
cd Cooking-Recipe-Generator
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the app**
```bash
nodemon index.js
```

4. **Open in your browser**
```bash
http://localhost:3000
```

## Usage

- Enter an ingredient and click "Generate Recipe" to get a recipe using that ingredient.
- Click "Random Recipe" to get a random meal suggestion.
- View the recipe details, ingredients, instructions, and a YouTube video if available.

## Credits

- [TheMealDB API](https://www.themealdb.com/) for recipe data.

## License

This project is open source and available under the MIT License.