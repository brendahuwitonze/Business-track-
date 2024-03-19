const mongoose = require ("mongoose");

const  carSchema = new mongoose.Schema({
    brandName: {
    type: String,
    required: true
    },
    manufacturedDate:{
        type: Date,
        reuired: true,
        default: Date.now
    },
    plateNumber:{
        type:String,
        unique: true,
    },
    color: {
        type: String,
        enum : ['Red', 'Blue','Green','Black','White'],
        required:true
    }, 
},{timestamps:true})
const carModel = mongoose.model('Car',carSchema)
module.exports= {carModel}