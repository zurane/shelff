import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import propType from "prop-types";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const CreateRecipe = ({ openModal, close }) => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [],
    instructions: "",
    cookingTime: "",
    category: "",
  });

  const [currentIngredient, setCurrentIngredient] = useState("");

  const navigate = useNavigate();

  const updateRecipe = (field, value) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [field]: value,
    }));
  };
  // Define the addIngredient function that will be called when the Add Ingredient button is clicked
  // The function will add the currentIngredient to the list of ingredients in the recipe state
  const addIngredient = () => {
    if (currentIngredient.trim() !== "") {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        ingredients: [...prevRecipe.ingredients, currentIngredient],
      }));
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (index) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: prevRecipe.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/recipes`, recipe)
      .then((response) => {
        console.log(response.data);
        navigate("/recipes"); // Redirect to the home page
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal open={openModal} onClose={close}>
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
          Create a new recipe
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={recipe.title}
            onChange={(e) => updateRecipe("title", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Ingredient"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={addIngredient}>
            Add Ingredient
          </Button>
          <List>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeIngredient(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={ingredient} />
              </ListItem>
            ))}
          </List>
          <TextField
            label="Instructions"
            value={recipe.instructions}
            onChange={(e) => updateRecipe("instructions", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cooking Time"
            value={recipe.cookingTime}
            onChange={(e) => updateRecipe("cookingTime", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            value={recipe.category}
            onChange={(e) => updateRecipe("category", e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button variant="contained" color="primary" type="submit">
            Create a new recipe
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

CreateRecipe.propTypes = {
  openModal: propType.bool.isRequired,
  close: propType.func.isRequired,
};

export default CreateRecipe;
