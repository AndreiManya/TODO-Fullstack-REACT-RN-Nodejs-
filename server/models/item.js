import mongoose  from "mongoose";

const ItemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    value: {
        type: String,
        required: true,
    },
    checked: { 
        type: Boolean,
        required: true
    }
});

export default mongoose.model('Item', ItemSchema);