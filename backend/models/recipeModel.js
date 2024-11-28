import mongoose from "mongoose";

// Create a recipe schema

const recipeSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        ingredients: [{
            type: String,
            required: true,
        }],
        instructions: {
            type: String,
            required: true,
        },
        cookingTime: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Other'], // enum means the value of category field must be from the given array.
            default: 'Other',
        },

    },
    {
        timestamps: true, // this will automatically add the createdAt and updatedAt field to the schema.
    }
);

//Creation of the Recipe model
export const Recipe = mongoose.model("Recipe", recipeSchema);
