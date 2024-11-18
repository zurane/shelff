import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import bookRouter from "./routes/booksRoute.js";
import cors from "cors";

// Create the server
const app = express();
//Add middleware to enable CORS
//CORS (Cross-Origin Resource Sharing) is a security feature implemented
//by browsers to restrict JavaScript code running in a browser from making
//requests to a different domain than the one that served the JavaScript code.
//This is a security feature to prevent cross-site request forgery attacks.
app.use(cors());
// Add middleware to parse JSON data
// A middleware is a function that has access to the request and response objects.
// It can execute any code, make changes to the request and response objects, end the request-response cycle,
//and call the next middleware in the stack.
// Middleware functions can perform the following tasks:
// Execute any code.
// Make changes to the request and the response objects.
// End the request-response cycle.
// Call the next middleware function in the stack.
// If the current middleware function does not end the request-response cycle,
// it must call next() to pass control to the next middleware function.
// Otherwise, the request will be left hanging.
app.use(express.json());

// Start the server
app.get("/", (request, response) => {
  return response.status(200).send("Hello World!");
});

// Use the book router for all routes starting with /books
// The book router is responsible for managing the routes related to books.
app.use("/books", bookRouter);

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
