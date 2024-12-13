import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PiBookOpen } from "react-icons/pi";
import BackButton from "../components/BackButton";
import { PiSpinner } from "react-icons/pi";
const Dessert = () => {
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

  const checkDinner = recipes.filter((recipe) => recipe.category === "Dessert"); // Get all recipes with category Dessert
  console.log(checkDinner);

  return (
    <div className="max-w-4xl mx-auto">
      <BackButton />
      {isLoading ? (
        <PiSpinner className="text-4xl" />
      ) : (
        <div className="py-5">
          <h1 className="font-bold text-4xl">
            Dessert Recipes ({checkDinner ? checkDinner.length : 0})
          </h1>
          <div className="recipes py-5">
            {checkDinner.map((recipe) => (
              <div key={recipe._id}>
                <Link
                  to={`/recipes/details/${recipe._id}`}
                  className="recipe leading-10 border-b flex items-center gap-2"
                >
                  <PiBookOpen />
                  <h2>{recipe.title}</h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dessert;
