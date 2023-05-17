import express  from "express";
import mongoose  from "mongoose";
import ItemModel from './models/item.js';
import cors from 'cors';

mongoose
    .connect('mongodb+srv://admin:admin@cluster0.hb94eym.mongodb.net/todo?retryWrites=true&w=majority')
    .then(() => console.log('DB connected'))
    .catch(() => console.log('DB is NOT connected'))

const app = express();

app.use(express.json());
app.use(cors());

app.get('/todo', async (req, res) => { 
    try {
        const list = await ItemModel.find();

        res.json(list);
    } catch (error) {
        res.status(500).json({
            message: "Не удалось получить список задач"
        });
    }
})

app.post('/todo', async (req, res) => { 
    try {
        const doc = new ItemModel({
            id: req.body.id,
            value: req.body.value,
            checked: req.body.checked
        });

        const item = await doc.save();
        res.json(item);
    } catch (error) {
        res.status(500).json({
            message: "Не удалось создать задачу"
        });
    }
})

app.delete('/todo/:id', async (req, res) => { 
    try {
        const todoId = req.params.id;

        await ItemModel.findOneAndDelete(
        {
            id: todoId,
        })

        res.json({
            succes: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Не удалось удалить статью"
        });
    }
})

app.patch('/todo/:id', async (req, res) => { 
    try {
        const todoId = req.params.id;

        await ItemModel.updateOne(
        {
            id: todoId,
        }, {
            id: req.body.id,
            value: req.body.value,
            checked: req.body.checked
        })

        res.json({
            succes: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Не удалось удалить статью"
        });
    }
})


app.listen(8080, (err) => { 
    if (err) { 
        return console.log(err)
    }
    console.log("ok")
})
