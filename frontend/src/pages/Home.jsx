import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
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

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="max-w-6xl mx-auto">
          <ul>
            {books.map((book) => (
              <Link to={`/books/details/${book._id}`} key={book._id}>
                <li>
                  {book.author} - {book.title} - {book.publishedYear} -
                  {book.genre}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
