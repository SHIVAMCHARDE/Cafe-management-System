const router = require("express").Router()
const Order = require("../Models/Order")
const User = require("../Models/User")
const Cafe = require("../Models/Cafe")
const verify = require('../verifyToken')



router.post('/addOrder', async (req, res) => {

    const today = new Date()

    const user = req.body.user
    const cafe = req.body.cafe
    const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
    const isPaid = req.body.isPaid
    const data = req.body.data
    const discount = req.body.discount
    const totalAmount = req.body.totalAmount

    let newOrder = new Order({
        user,
        cafe,
        date,
        isPaid,
        data,
        discount,
        totalAmount
    })


    newOrder = await newOrder.save()

    try {

        const newUser = await User.findById(user)
        let userOrders = newUser.orders

        const newCafe = await Cafe.findById(cafe)
        let cafeOrders = newCafe.orders

        userOrders.push(newOrder._id)
        cafeOrders.push(newOrder._id)

        let ParentUser = await User.updateOne({ _id: user }, {
            $set: { orders: userOrders }
        })

        let ParentCafe = await Cafe.updateOne({ _id: cafe }, {
            $set: { orders: cafeOrders }
        })


        res.json('Order Added Successfully')

    } catch (e) {

        console.log(e)
        res.json(e)

    }

})


module.exports = router