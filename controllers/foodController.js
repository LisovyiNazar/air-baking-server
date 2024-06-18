import foodModel from "../models/foodModel.js";
import fs from 'fs'

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// get food by ID
const getFoodById = async (req, res) => {
    try {
        const item = await foodModel.findById(req.params.id)
        res.json({ success: true, data: item })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

const editFoodById = async (req, res) => {
    let image

    if (req.file?.filename) {
        image = req.file?.filename

        console.log('delete old image');
        fs.unlink(`uploads/${req.body.main_image}`, () => { })
    } else {
        image = req.body.main_image
    }    

    await foodModel.findOneAndUpdate({ _id: req.params.id }, 
        {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category:req.body.category,
            image: image,
        }
    )

    res.json({ success: true, message: "Food Edited" })
}

// add food
const addFood = async (req, res) => {
    try {
        let image_filename = `${req.file.filename}`

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category:req.body.category,
            image: image_filename,
        })

        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

export { listFood, addFood, removeFood, getFoodById, editFoodById }