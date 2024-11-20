import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { PiBookOpen } from "react-icons/pi";
import { PiPencilSimpleLineThin } from "react-icons/pi";
import { PiPlusThin } from "react-icons/pi";
import { PiMinusCircleThin } from "react-icons/pi";
// import { Link } from "react-router-dom";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
const Home = () => {
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
    <div className="max-w-4xl mx-auto p-10">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">My library ({books.length})</h1>
        <span className="bg-gray-100 shadow-sm py-1 px-3 rounded">
          <Link
            className="flex flex-1 items-center gap-1 text-sm"
            to="/books/add"
            data-tip="Add a new book"
          >
            <PiPlusThin />
            <span>Add new</span>
          </Link>
        </span>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="my-7">
          <div>
            {books.map((book) => (
              <div key={book._id}>
                <div className="flex flex-row items-center justify-between border-b ">
                  <Link
                    className="py-3 flex flex-row items-center gap-2 hover:text-blue-400"
                    to={`/books/details/${book._id}`}
                  >
                    <PiBookOpen />
                    <span className="text-md font-semibold">{book.title}</span>
                  </Link>
                  {/* actions container */}
                  <div className="flex">
                    <span className="py-1 px-3 rounded">
                      <Link to={`/books/edit/${book._id}`}>
                        <PiPencilSimpleLineThin className="text-lg" />
                      </Link>
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
    </div>
  );
};

export default Home;
