const mongoose = require('mongoose')
const dotenv= require('dotenv')
dotenv.config();
const  express = require('express')
const  {carModel}= require('./models/carModel.js');
const app = express()
const  PORT = process.env.PORT || 3000
const db_connection_String =  process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/car-tracking-system';

app.use(express.json());

app.post('/car/add',async(req,res)=>{
    try {
        const addCar= await carModel.create(req.body)
        res.status(201).json({
            message:"car added",
            Car: addCar
        })

    } catch (error) {
        res.status(400).json({
            message:"failed to add car"
        })
    }
})

app.get('/car/list',async(req,res)=>{
    try {
        const getAllCars = await carModel.find()
        res.status(201).json({
            message:"display all cars in databse",
            Car: getAllCars
        })
    } catch (error) {
        res.status(400).json({
            message:'failed to get all cars'
        })
    }
})

app.delete('/car/delete/:id',async(req,res)=>{
    try {
        const deletedCar = await carModel.findByIdAndDelete({_id:req.params.id})
        res.status(201).json({
            message:"student deleted",
            Car:deletedCar
        })
    } catch (error) {
        res.status(401).json({
            message:"failed to delete"
        })
    }
})

// app.patch("car/update/:id",async(req,res)=>{
//     try {
//     const updateCar = req.body
//     const updatedCar= await carModel.findByIdAndUpdate(req.params.id,updateCar)
//     res.status(400).json({
//         meassage: "car is updated",
//         Car:updatedCar
//     })
//     } catch (error) {
//         res.status(200).json({
//             message :"failed to update"
//         })
//     }
// })
app.patch("/car/update/:id", async (req, res) => {
    try {
        const updates = req.body; // Assuming your update data is in req.body
        const updatedCar = await carModel.findByIdAndUpdate(req.params.id, updates, { new: true }); // Options for update
        res.status(200).json({
            message: "Car updated successfully",
            Car: updatedCar
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
mongoose.connect(db_connection_String)
.then(()=>{
    console.log("Database connected")
    
    app.listen(PORT , () =>console.log(`Server is running on port ${PORT}`))
}).catch((err)=>console.log(err));

