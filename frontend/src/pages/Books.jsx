import Spinner from "../components/Spinner";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Books() {
  // Get the id from the URL
  // The id is a parameter in the URL that is used to identify the book
  // The useParams hook is used to access the parameters in the URL
  const { id } = useParams();
  // Define the state variables and the functions to update them
  // The state variables are book and isLoading
  // The functions to update the state variables are showBook and setLoading respectively
  const [book, showBook] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        console.log(response.data);
        showBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto">
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <h1>{book.title}</h1>
          <p>{book.author}</p>
          <p>{book.publishedYear}</p>
          <p>{book.genre}</p>
        </div>
      )}
    </div>
  );
}
