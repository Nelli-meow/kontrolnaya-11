import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import Users from "./routers/Users";
import ItemRouter from "./routers/Items";
import CategoriesRouter from "./routers/Categories";

const app = express();
const port =  8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', Users);
app.use('/items', ItemRouter);
app.use('/categories', CategoriesRouter);


const run = async () => {

    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });

}

run().catch((err) => console.log(err));
