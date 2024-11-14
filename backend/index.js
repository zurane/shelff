import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

// Create the server
const app = express();

// Add middleware to parse JSON data

app.use(express.json());

// Start the server
app.get("/", (request, response) => {
  return response.status(200).send("Hello World!");
});

// Create a new book document
app.post("/books", async (request, response) => {
  try {
    if (
      // Check if all fields are present in the request body
      !request.body.title ||
      !request.body.author ||
      !request.body.publishedDate || //for example, 2021-01-01
      !request.body.genre
    ) {
      // if any of the required fields is missing, then send an error message and status code 400 for bad request.
      return response.status(400).send({ message: "All fields are required" });
    }
    // if the request body is valid then:
    // Create a new book document with the request body data
    const newBook = new Book({
      title: request.body.title,
      author: request.body.author,
      publishedDate: new Date(request.body.publishedDate),
      genre: request.body.genre,
    });
    // Now, the new book document is saved to the database
    // The await keyword is used to wait for the promise to be resolved since the create method returns a promise.
    const book = await Book.create(newBook);
    // Send the book document as a response with status code 201 for successfully creating a new resource in the database.
    return response.status(201).send(book);
  } catch (error) {
    console.log(error);
    // Send an error message and status code 500 for internal server error
    return response.status(500).send({ message: error.message });
  }
});

// Get all books from the database
app.get("/books", async (request, response) => {
  try {
    // Find all the book documents in the database
    const books = await Book.find({});
    // Send the book documents as a response with status code 200 for successful request
    return response.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    // Send an error message and status code 500 for internal server error
    return response.status(500).send({ message: error.message });
  }
});

// Get a book by id
app.get("/books/:id", async (request, response) => {
  try {
    // Find a book document by id
    const book = await Book.findById(request.params.id);
    return response.status(200).send(book);
  } catch (error) {
    console.log(error);
    // Send an error message and status code 500 for internal server error
    return response.status(500).send({ message: error.message });
  }
});

// Update a book by id

app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishedDate ||
      !request.body.genre
    ) {
      return response.status(400).send({ message: "All fields are required" });
    }
    // This line of code will find a book by id and update the book document with the request body data.
    // The params is a react-router-dom object that contains the URL parameters, and the id is the parameter we want to get.
    const id = request.params.id;
    const bookResults = await Book.findByIdAndUpdate(id, request.body);
    // If the book is not found, then send an error message and status code 404 for not found.
    if (!bookResults) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// Connect to the database
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to the database");
    // Start the server
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
