import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Define the state variable book and the function to update it
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishedYear: "",
    genre: "",
  });

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`) // Send a GET request to the server to fetch the book with the given id.
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const updateBook = (field, value) => {
    setBook((prevBook) => ({
      ...prevBook, // Spread operator to copy the previous state of the book object.
      [field]: value, // Update the field with the new value. The field is the key in the book object.
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.
    axios
      .put(`http://localhost:3000/books/${id}`, book) // Send a PUT request to the server with the updated book object.
      .then((response) => {
        console.log(response.data);
        navigate(`/books/details/${id}`); // Redirect to the details page of the book.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Edit Book</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              value={book.title}
              onChange={(e) => updateBook("title", e.target.value)}
            />
          </label>
          <label htmlFor="author">
            Author
            <input
              type="text"
              id="author"
              value={book.author}
              onChange={(e) => updateBook("author", e.target.value)}
            />
          </label>
          <label htmlFor="publishedYear">
            Published Year
            <input
              type="text"
              id="publishedYear"
              value={book.publishedYear}
              onChange={(e) => updateBook("publishedYear", e.target.value)}
            />
          </label>
          <label htmlFor="genre">
            Genre
            <input
              type="text"
              id="genre"
              value={book.genre}
              onChange={(e) => updateBook("genre", e.target.value)}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditBook;
