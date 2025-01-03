import mongoose from "mongoose";

// Create a book schema

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
            enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Other'],
            default: 'Other',
        },

    },
    {
        timestamps: true, // this will automatically add the createdAt and updatedAt field to the schema.
    }
);

//Creation of the Book model
export const Recipe = mongoose.model("Recipe", recipeSchema);
