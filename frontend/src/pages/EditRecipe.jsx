import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";

const EditRecipe = ({ open, handleClose, recipeId }) => {
  EditRecipe.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    recipeId: PropTypes.number,
  };
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title:"",
    ingredients: [],
    instructions: [],
    cookingTime: "",
    category: "",
  });
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [isLoading, setLoading] = useState(true);

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
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: newIngredients,
    }));
  };

  const fetchRecipe = (recipeId) => {
    axios
      .get(`http://localhost:3000/recipes/${recipeId}`)
      .then((response) => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
      fetchRecipe(recipeId)
  }, [recipeId]);

  const updateRecipe = (field, value) => {
    setRecipe((prevrecipe) => ({
      ...prevrecipe,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/recipes/${recipeId}`, recipe)
      .then((response) => {
        console.log(response.data);
        navigate(`/recipes/details/${recipeId}`);
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
          Edit Recipe
        </Typography>
        {isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              value={recipe.title}
              onChange={(e) => updateRecipe("title", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Ingredients"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={addIngredient}>
              Add Ingredient
            </Button>
            <List>
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient, index) => (
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
              Save Changes
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default EditRecipe;
