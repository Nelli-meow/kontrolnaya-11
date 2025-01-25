import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ["computers", "laptops", "TV", "tablets"],
    },
});

const Category = mongoose.model('Category', categorySchema);
export default Category;