import { PiPlusThin } from "react-icons/pi";
import { useEffect, useState } from "react";
import CreateRecipe from "../pages/CreateRecipe";


const Navigation = () => {
  const [recipes, setRecipes] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetch("http://localhost:3000/recipes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecipes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-3">
      <div className="flex flex-row justify-between m-2 items-center">
        <h1 className="text-md font-bold">All Recipes ({recipes.count})</h1>
        <span className="bg-green-200 shadow-sm py-2 px-3 rounded-full">
          <button
            onClick={() => handleOpen()}
            className="flex flex-1 items-center gap-1 text-sm"
            to="/recipes/create"
          >
            <PiPlusThin className="text-black text-sm" />
            <span className="font-semibold text-black">Add a new recipe</span>
          </button>
        </span>
      </div>
      {<CreateRecipe openModal={openModal} close={handleClose} />}
    </div>
  );
};

export default Navigation;
