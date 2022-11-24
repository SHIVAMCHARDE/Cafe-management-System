const mongoose = require("mongoose")

const DishSchema = new mongoose.Schema({
    dishName : { type:String , required:true},
    isVeg : { type:Boolean , required:true},
    category : { type:String , required:true },
    price : { type : Number , required : true},
    avgRating : { type : mongoose.Types.Decimal128},
    cafe : {type: mongoose.Schema.Types.ObjectId , ref:'Cafe'},

})

    module.exports = mongoose.model("Dish", DishSchema); //will create a Schema Name User Which can be Accessed using 'new' keyword just like creating object