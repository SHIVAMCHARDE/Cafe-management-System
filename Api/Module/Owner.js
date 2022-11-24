const mongoose = require("mongoose")

const OwnerSchema = new mongoose.Schema({
    ownerName : { type:String , required:true},
    email : { type:String , sparse:true , unique:true},
    ownerPassword : { type:String , required:true },
    accessToken : { type : String},
    cafe : [{type: mongoose.Schema.Types.ObjectId , ref:'Cafe'}],
})

    module.exports = mongoose.model("Owner", OwnerSchema); //will create a Schema Name User Which can be Accessed using 'new' keyword just like creating object