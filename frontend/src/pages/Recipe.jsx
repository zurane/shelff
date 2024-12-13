import Spinner from "../components/Spinner";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { PiAlarmThin } from "react-icons/pi";
import { PiBowlSteamThin } from "react-icons/pi";
import { PiArrowDownThin } from "react-icons/pi";
import { PiHeart } from "react-icons/pi";
import { PiShareFatThin } from "react-icons/pi";

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
        setTimeout(() => {
          showRecipe(response.data);
          setLoading(false);
        }, 500); 
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-1">
      <BackButton />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            <div className="p-5 bg-slate-50 border border-gray-100 rounded shadow-sm">
              <h1 className="text-xl font-bold border-b py-2">
                › {recipe.title}
              </h1>
              {/* The recipe details are displayed in a grid layout */}
              <div className="grid grid-cols-2 py-3">
                <div className="leading-3 border-r">
                  <PiBowlSteamThin className="text-xl text-yellow-700" />
                  <h5 className="font-bold text-sm">Category</h5>
                  <p className="text-md text-gray-700 py-2">
                    {recipe.category}
                  </p>
                </div>
                <div className="leading-3 pl-4">
                  <PiAlarmThin className="text-xl text-green-700" />
                  <h5 className="font-bold text-sm ">Cooking time</h5>
                  <p className="text-md text-gray-700 py-2">
                    {recipe.cookingTime} minutes
                  </p>
                </div>
              </div>
            </div>
            {/* Actions */}
            <div className="flex flex-row items-center justify-evenly bg-slate-50 border border-gray-100 shadow-sm rounded md:col-span-1  sm:col-span-2">
              <button className="text-gray px-3 py-2 rounded flex flex-col items-center justify-center">
                <span className="bg-persian-blue-100 p-2 rounded-full">
                  <PiArrowDownThin className="text-persian-blue-500 text-xl" />
                </span>
                Download
              </button>
              <button className="text-gray px-6 py-2 rounded border-r border-l flex flex-col items-center justify-center">
                <span className="bg-purple-heart-50 p-2 rounded-full">
                  <PiHeart className="text-xl text-purple-heart-500" />
                </span>
                Favorite
              </button>
              <button className="text-gray px-3 py-2 rounded flex flex-col items-center justify-center">
                <span className="bg-cognac-50 p-2 rounded-full">
                  <PiShareFatThin className="text-cognac-500 text-xl" />
                </span>
                Share
              </button>
            </div>
            {/* Recipe and Instructions */}
            <div className="rounded-lg col-span-1 sm:col-span-2">
              <h2 className="text-md font-bold border-b py-2">
                Recipe Ingredients
              </h2>
              <ul className="py-2 leading-8">
                {recipe.ingredients &&
                  recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>› {ingredient}</li>
                  ))}
              </ul>
            </div>
            <div className="rounded-lg p-1 col-span-1 sm:col-span-2">
              <h2 className="text-md font-bold border-b py-2">
                Cooking Instructions
              </h2>
              <ol className="p-2 list-decimal leading-8">
                {recipe.instructions &&
                  recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
              </ol>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Recipes;
