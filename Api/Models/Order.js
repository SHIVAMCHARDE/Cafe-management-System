const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({

    user : {type: mongoose.Schema.Types.ObjectId , ref:'User'},
    date : { type:Date , required:true},
    paymentStatus : { type:Boolean , required:true},
    dishes : [{type: mongoose.Schema.Types.ObjectId , ref:'Dish'}],
    discount : { type:Number},
    totalAmount : { type : Number , required : true},

})

    module.exports = mongoose.model("Order", OrderSchema); //will create a Schema Name User Which can be Accessed using 'new' keyword just like creating object