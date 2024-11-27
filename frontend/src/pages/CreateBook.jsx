import axios from "axios";
import { useState } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";

const CreateBook = ({ openModal, close }) => {
  // Define the prop types for the component
  // The openModal prop is a boolean that determines if the modal is open or not
  // The close prop is a function that will be called when the modal is closed
  CreateBook.propTypes = {
    openModal: PropTypes.bool,
    close: PropTypes.func,
  };
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
    // Make a POST request to the server to create a new book
    axios
      .post(`http://localhost:3000/books`, book)
      .then((response) => {
        console.log(response.data);
        setBook(response.data); // Update the list of books with the new book
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal open={openModal} close={close}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          borderRadius: 1,
          bgcolor: "background.paper",
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Add a Book
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={book.title}
            onChange={(e) => updateBook("title", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author"
            value={book.author}
            onChange={(e) => updateBook("author", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Publication Date"
            value={book.publishedDate}
            onChange={(e) => updateBook("publishedDate", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Genre"
            value={book.genre}
            onChange={(e) => updateBook("genre", e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit">
            Create new book
          </Button>
        </form>
      </Box>
    </Modal>
    // <div className="max-w-4xl mx-auto p-10">
    //   <h1>Add a new book</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="title">Title</label>
    //     <input
    //       type="text"
    //       id="title"
    //       value={book.title}
    //       onChange={(e) => updateBook("title", e.target.value)}
    //     />
    //     <label htmlFor="author">Author</label>
    //     <input
    //       type="text"
    //       id="author"
    //       value={book.author}
    //       onChange={(e) => updateBook("author", e.target.value)}
    //     />
    //     <label htmlFor="publishedYear">Published Date</label>
    //     <input
    //       type="text"
    //       id="publishedDate"
    //       value={book.publishedDate}
    //       onChange={(e) => updateBook("publishedDate", e.target.value)}
    //     />
    //     <label htmlFor="genre">Genre</label>
    //     <input
    //       type="text"
    //       id="genre"
    //       value={book.genre}
    //       onChange={(e) => updateBook("genre", e.target.value)}
    //     />
    //     <button type="submit">Create Book</button>
    //   </form>
    // </div>
  );
};

export default CreateBook;
