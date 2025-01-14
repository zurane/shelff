import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PiBookOpen } from "react-icons/pi";
import { PiPencilSimpleLineThin } from "react-icons/pi";
import Navigation from "../components/Navigation";
import { PiMinusCircleThin } from "react-icons/pi";
import EditBook from "./EditRecipe";
import Tabs from "../components/Tabs";
import Spinner from "../components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import DelModal from "../components/DelModal";
// import { Link } from "react-router-dom";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleOpen = (id) => {
    setSelectedRecipeId(id);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setSelectedRecipeId(null);
  };

  // Define the state variables and the functions to update them
  // The state variables are recipes and isLoading
  // The functions to update the state variables are showBooks and setLoading respectively
  // The state variable recipes is an array that will store the list of recipes
  // The state variable isLoading is a boolean that will be true when the data is being fetched from the server
  // and false when the data has been fetched
  // The function showBooks will update the state variable recipes
  const [recipes, showBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  //Create a delete function that will be called when the delete button is clicked
  //The function will make a DELETE request to the server to delete the book with the given id
  //The function will then update the list of recipes by filtering out the book with the given id
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/recipes")
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data.data)) {
          setTimeout(() => {
            showBooks(response.data.data);
            setLoading(false);
          }, 500);
        } else {
          showBooks([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setSelectedRecipeId(id);
    setConfirmDelete(true);
  };
  const deleteBook = (id) => {
    axios
      .delete(`http://localhost:3000/recipes/${id}`)
      .then((response) => {
        console.log(response.data);
        // Now check if the given id is strictly equal to the id of the book
        // If it is not equal, then keep the book in the list.
        showBooks(recipes.filter((recipe) => recipe._id !== id));
        toast.success("Item deleted successfully", {
          position: "bottom-center",
        });
        setConfirmDelete(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancel = () => {
    setConfirmDelete(false);
  };

  return (
    <>
      {confirmDelete && ( // If confirmDelete is true, render the DelModal component.
        <DelModal delete={() => deleteBook(selectedRecipeId)} cancel={cancel} />
      )}
      <div className="max-w-4xl mx-auto my-2 py-4">
        <Tabs />
        <Toaster position="bottom-center" />
        <Navigation />
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="m-2">
            <div>
              {recipes.map((recipe) => (
                <div key={recipe._id}>
                  <div className="flex flex-row items-center justify-between border-b ">
                    <Link
                      className="py-4 flex flex-row items-center gap-2"
                      to={`/recipes/details/${recipe._id}`}
                    >
                      <PiBookOpen />
                      <div className="leading-5">
                        <span className="text-md font-semibold">
                          {recipe.title}
                          <br />
                          <span className="text-xs text-gray-400 font-light">
                            Added {timeAgo(new Date(recipe.createdAt))}
                          </span>
                        </span>
                      </div>
                    </Link>
                    {/* actions */}
                    <div className="flex">
                      <span className="py-1 px-3 rounded">
                        <button onClick={() => handleOpen(recipe._id)}>
                          <PiPencilSimpleLineThin className="text-lg" />
                        </button>
                      </span>
                      <span className="py-1 px-3 rounded">
                        <button
                          onClick={() => handleDelete(recipe._id)}
                          className="hover:text-red-500"
                        >
                          <PiMinusCircleThin className="text-lg" />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedRecipeId && (
          <EditBook
            open={openModal}
            handleClose={handleClose}
            bookId={selectedRecipeId}
          />
        )}
      </div>
    </>
  );

  // Define a function that will return the time ago
  // The function will take a date as an argument
  function timeAgo(date) {
    // Get the current date
    const now = new Date();
    // Calculate the difference in seconds between the current date and the given date
    const seconds = Math.floor((now - date) / 1000);
    // If the difference is greater than a year, return the number of years
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      // If the difference is greater than a year, return the number of years
      return interval + " years ago";
    }
    // If the difference is greater than a month, return the number of months
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    // If the difference is greater than a day, return the number of days
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
};

export default Home;
