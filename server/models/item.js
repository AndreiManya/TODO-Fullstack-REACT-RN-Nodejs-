import mongoose  from "mongoose";

const ItemSchema = new mongoose.Schema({
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