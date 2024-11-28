import Spinner from "../components/Spinner";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { PiAlarmThin } from "react-icons/pi";
import { PiBowlSteamThin } from "react-icons/pi";

const Recipes = () => {
  // Get the id from the URL
  // The id is a parameter in the URL that is used to identify the book
  // The useParams hook is used to access the parameters in the URL
  const { id } = useParams();
  // Define the state variables and the functions to update them
  // The state variables are book and isLoading
  // The functions to update the state variables are showBook and setLoading respectively
  const [recipe, showRecipe] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/recipes/${id}`)
      .then((response) => {
        console.log(response.data);
        showRecipe(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto">
      <BackButton />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className=" p-3  bg-white border border-slate-100 rounded shadow-sm">
              <h1 className="text-lg font-bold border-b text-purple-950 py-2">
                › {recipe.title}
              </h1>
              {/* The recipe details are displayed in a grid layout */}
              <div className="grid grid-cols-2 py-3">
                <div className="leading-3 border-r">
                  <PiBowlSteamThin className="text-xl" />
                  <h5 className="font-bold text-sm uppercase">Category</h5>
                  <p className="text-md text-gray-700 py-2">
                    {recipe.category}
                  </p>
                </div>
                <div className="leading-3 pl-4">
                  <PiAlarmThin className="text-xl" />
                  <h5 className="font-bold text-sm uppercase">Cooking time</h5>
                  <p className="text-md text-gray-700 py-2">
                    {recipe.cookingTime} minutes
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-3 col-span-2">
              <h2 className="text-lg font-bold border-b py-2">Ingredients</h2>
              <ul className="">
                {recipe.ingredients &&
                  recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="py-1">
                     › {ingredient}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Recipes;
