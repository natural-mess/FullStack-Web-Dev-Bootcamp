import React from "react";
import ReactDOM from "react-dom";

const img = "https://picsum.photos/200";

ReactDOM.render(
  <div>
    <h1 className="heading">
      My Favourite Foods
    </h1>
    <div>
      <img src={img + "?grayscale"} alt="random"/>
      <img className="food-img" src="https://i3.wp.com/bensabaconlovers.com/wp-content/uploads/2023/10/baked-bacon.jpg" alt="Bacon"/>
      <img className="food-img" src="https://www.gastronomiavasca.net/uploads/image/file/3283/fiambre_jamon_cocido.jpg" alt="jamon"/>
      <img className="food-img" src="https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/veg-noodles-vegetable-noodles-recipe.jpg" alt="noodles"/>
    </div>
  </div>,
  document.getElementById("root")
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
