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
  return response.status(200).send("Hello World!")
});

// Create a new book document
app.post("/books", async (request, response) => {
  try {
    // Create a new book document with a title of your choice
    if (
      // Check if all fields are present in the request body
      !request.body.title ||
      !request.body.author ||
      !request.body.publishedDate || //for example, 2021-01-01
      !request.body.genre
    ) {
      // if any of the required fields is missing, then send an error message and status code 400 for bad request
      return response.status(400).send({ message: "All fields are required" });
    }
    // Create a new book document with the request body data
    const newBook = new Book({
      title: request.body.title,
      author: request.body.author,
      publishedDate: new Date(request.body.publishedDate),
      genre: request.body.genre,
    });
    // Save the book document to the database
    const book = await Book.create(newBook);
    // Send the book document as a response with status code 201 for created successfully
    return response.status(201).send(book);
  } catch (error) {
    console.log(error);
    // Send an error message and status code 500 for internal server error
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
