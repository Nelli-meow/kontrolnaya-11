import express from "express";
import Category from "../models/Category";

const CategoriesRouter = express.Router();

CategoriesRouter.get("/", async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).send(categories);
    } catch (error) {
        res.status(404).send({error: 'something went wrong :('});
    }
});

export default CategoriesRouter;