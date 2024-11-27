import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { PiBookOpen } from "react-icons/pi";
import { PiPencilSimpleLineThin } from "react-icons/pi";
import Navigation from "../components/Navigation";
import { PiMinusCircleThin } from "react-icons/pi";
import EditBook from "./EditBook";
import Tabs from "../components/Tabs";

// import { Link } from "react-router-dom";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleOpen = (id) => {
    setSelectedBookId(id);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setSelectedBookId(null);
  };
  // Define the state variables and the functions to update them
  // The state variables are books and isLoading
  // The functions to update the state variables are showBooks and setLoading respectively
  // The state variable books is an array that will store the list of books
  // The state variable isLoading is a boolean that will be true when the data is being fetched from the server
  // and false when the data has been fetched
  // The function showBooks will update the state variable books
  const [books, showBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  //Create a delete function that will be called when the delete button is clicked
  //The function will make a DELETE request to the server to delete the book with the given id
  //The function will then update the list of books by filtering out the book with the given id
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data.data)) {
          showBooks(response.data.data);
        } else {
          showBooks([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const deleteBook = (id) => {
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then((response) => {
        console.log(response.data);
        // Now check if the given id is strictly equal to the id of the book
        // If it is not equal, then keep the book in the list.
        showBooks(books.filter((book) => book._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs />
      <Navigation />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="my-2">
          <div>
            {books.map((book) => (
              <div key={book._id}>
                <div className="flex flex-row items-center justify-between border-b ">
                  <Link
                    className="py-4 flex flex-row items-center gap-2 hover:text-blue-400"
                    to={`/books/details/${book._id}`}
                  >
                    <PiBookOpen />
                    <div className="leading-5 ">
                      <span className="text-md font-semibold">
                        {book.title}
                        <br />
                        <span className="text-xs text-gray-400 font-light">
                          Added {timeAgo(new Date(book.createdAt))}
                        </span>
                      </span>
                    </div>
                  </Link>
                  {/* actions container */}
                  <div className="flex">
                    <span className="py-1 px-3 rounded">
                      <button onClick={() => handleOpen(book._id)}>
                        <PiPencilSimpleLineThin className="text-lg" />
                      </button>
                    </span>
                    <span className="py-1 px-3 rounded">
                      <button
                        onClick={() => deleteBook(book._id)}
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
      {selectedBookId && (
        <EditBook
          open={openModal}
          handleClose={handleClose}
          bookId={selectedBookId}
        />
      )}
    </div>
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

