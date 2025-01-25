import express from "express";
import Item from "../models/Item";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import Category from "../models/Category";

export const ItemRouter = express.Router();

ItemRouter.get("/", async (req , res ) => {
    try {
        const items = await Item.find().populate("user");

        res.send(items);
    } catch (error) {
        res.status(404).send({error: 'something went wrong :('});
    }
});

ItemRouter.get("/:id", async (req , res ) => {
    try {
        const {id} = req.params;

        const item = await Item.findById(id).populate("user");

        if(!item){
            res.status(404).send({error: 'item not found'});
            return;
        }

        res.status(200).send(item);

    } catch (error) {
        res.status(404).send({error: 'something went wrong :('});
    }
});

ItemRouter.post("/", auth, imagesUpload.single('image'), async (req , res,next ) => {
    const expressReq = req as RequestWithUser;
    const saleMan = expressReq.user;

    try {
        if(!saleMan){
            res.status(404).send({error: 'saleMan not found'});
            return;
        }

        const categoryName = req.body.category;
        if (!categoryName) {
            res.status(400).send({ error: 'Category name is required' });
            return;
        }

        let category = await Category.findOne({ name: categoryName });

        if (!category) {
            category = new Category({ name: categoryName });
            await category.save();
        }

        const item = new Item({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            category: category._id,
            salesman: saleMan._id,
        });

        await item.save();
        res.status(200).send(item);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
        }
        next(error);
    }
});

ItemRouter.delete("/:id", auth, async (req , res ) => {
    const {id} = req.params;

    const expressReq = req as RequestWithUser;
    const user = expressReq.user;

    const item = await Item.findById(id);

    if(!item){
        res.status(404).send({error: 'item not found'});
        return;
    }

    if(item.salesman.toString() !== user._id.toString()) {
        res.status(403).send({error: 'You cant delete this item!'});
        return;
    }

    await Item.findByIdAndDelete(id);
    res.status(200).send({ message: "Task deleted successfully" });
});

export default ItemRouter;