const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cafe: { type: mongoose.Schema.Types.ObjectId, ref: 'Cafe' },
    transactionId: { type: String , required:true },
    date: { type: Date, required: true },
    isPaid: { type: Boolean, required: true },
    data: [{ type: Object, required: true }],
    discount: { type: Number },
    totalAmount: { type: Number, required: true },

})

module.exports = mongoose.model("Order", OrderSchema); //will create a Schema Name User Which can be Accessed using 'new' keyword just like creating object