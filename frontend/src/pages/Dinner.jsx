import { useState, useEffect } from "react";
import axios from "axios";


const Dinner = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/recipes")
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data.data)) {
          setRecipes(response.data.data);
        } else {
          setRecipes([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const checkDinner = recipes.filter((recipe) => recipe.category === "Dinner"); // Get all recipes with category Dinner
  console.log(checkDinner);

  return (
    <div className="max-w-4xl mx-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Dinner</h1>
          <div className="recipes">
            {checkDinner.map((recipe) => (
              <div key={recipe._id} className="recipe">
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                <p>{recipe.category}</p>
                <p>{recipe.instructions}</p>
                <p>{recipe.cookingTime}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dinner;

