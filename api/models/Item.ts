import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    salesman: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const Item = mongoose.model('Item', ItemSchema);
export default Item;