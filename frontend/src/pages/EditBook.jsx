import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";

const EditBook = ({ open, handleClose, bookId }) => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishedYear: "",
    genre: "",
  });

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${bookId}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [bookId]);

  const updateBook = (field, value) => {
    setBook((prevBook) => ({
      ...prevBook,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/books/${bookId}`, book)
      .then((response) => {
        console.log(response.data);
        navigate(`/books/details/${bookId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
          Edit Book
        </Typography>
        {isLoading ? (
          <Spinner />
        ) : (
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
              value={new Date(book.publishedDate).toLocaleDateString()}
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
              Save Changes
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default EditBook;
