import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const navigate = useNavigate();
  // Define the state variable book and the function to update it
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishedDate: "",
    genre: "",
  });

  // Define the state variable isLoading and the function to update it

  const updateBook = (field, value) => {
    setBook((prevBook) => ({
      ...prevBook,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/books`, book)
      .then((response) => {
        console.log(response.data);
        setBook(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1>Add a new book</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={book.title}
          onChange={(e) => updateBook("title", e.target.value)}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          value={book.author}
          onChange={(e) => updateBook("author", e.target.value)}
        />
        <label htmlFor="publishedYear">Published Date</label>
        <input
          type="text"
          id="publishedDate"
          value={book.publishedDate}
          onChange={(e) => updateBook("publishedDate", e.target.value)}
        />
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          value={book.genre}
          onChange={(e) => updateBook("genre", e.target.value)}
        />
        <button type="submit">Create Book</button>
      </form>
    </div>
  );
};

export default CreateBook;
