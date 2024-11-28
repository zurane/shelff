import express from "express";
import { Recipe, Recipe as recipeModel } from "../models/recipeModel.js";

// express router is responsible for managing the routes
// and the middleware for the routes.
// The express.Router class can be used to create modular, mountable route handlers.
// A Router instance is a complete middleware and routing system.
// A Router instance is often referred to as a “mini-app”.
const router = express.Router();

// Create a new recipe document
router.post("/", async (request, response) => {
  try {
    if (
      // Check if all fields are present in the request body
      !request.body.title ||
      !request.body.ingredients ||
      !request.body.instructions ||
      !request.body.cookingTime ||
      !request.body.category
    ) {
      // if any of the required fields is missing, then send an error message and status code 400 for bad request.
      return response.status(400).send({ message: "All fields are required" });
    }
    // if the request body is valid then:
    // Create a new recipe document with the request body data
    const newRecipe = new recipeModel({
      title: request.body.title,
      ingredients: request.body.ingredients,
      instructions: request.body.instructions,
      cookingTime: request.body.cookingTime,
      category: request.body.category,

    });
    // Now, the new recipe document is saved to the database
    // The await keyword is used to wait for the promise to be resolved since the create method returns a promise.
    const recipe = await recipeModel.create(newRecipe);
    // Send the recipe document as a response with status code 201 for successfully creating a new resource in the database.
    return response.status(201).send(recipe);
  } catch (error) {
    console.log(error);
    // Send an error message and status code 500 for internal server error
    return response.status(500).send({ message: error.message });
  }
});

// Get all recipes from the database
router.get("/", async (request, response) => {
  try {
    // Find all the recipe documents in the database
    const recipes = await recipeModel.find({});
    // Send the recipe documents as a response with status code 200 for successful request
    return response.status(200).send({
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    console.log(error);
    // Send an error message and status code 500 for internal server error
    return response.status(500).send({ message: error.message });
  }
});

// Get a recipe by id
router.get("/:id", async (request, response) => {
  try {
    // Find a recipe document by id
    const recipe = await recipeModel.findById(request.params.id);
    return response.status(200).send(recipe);
  } catch (error) {
    console.log(error);
    // Send an error message and status code 500 for internal server error
    return response.status(500).send({ message: error.message });
  }
});

// Update a recipe by id
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.ingredients ||
      !request.body.instructions ||
      !request.body.cookingTime ||
      !request.body.category
    ) {
      return response.status(400).send({ message: "All fields are required" });
    }
    // This line of code will find a recipe by id and update the recipe document with the request body data.
    const id = request.params.id;
    const recipeResults = await Recipe.findByIdAndUpdate(id, request.body);
    if (!recipeResults) {
      return response.status(404).send({ message: "recipe not found" });
    }
    return response.status(200).send({ message: "recipe updated successfully" });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// Delete a recipe by id
router.delete("/:id", async (request, response) => {
  try {
    // Find a recipe by id and delete it
    const recipe = await recipeModel.findByIdAndDelete(request.params.id);
    if (!recipe) {
      return response.status(404).send({ message: "Recipe not found" });
    }
    return response.status(200).send({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

export default router;
