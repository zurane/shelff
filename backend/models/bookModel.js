import mongoose from "mongoose";

// Create a book schema

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishedDate: {
            type: Date,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // this will automatically add the createdAt and updatedAt field to the schema.
    }
);

//Creation of the Book model
export const Book = mongoose.model("Book", bookSchema);
