import express from "express";
import Item from "../models/Item";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";

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

        const item = new Item({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            category: req.body.category,
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

export default ItemRouter;