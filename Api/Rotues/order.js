const router = require("express").Router()
const Order = require("../Models/Order")
const User = require("../Models/User")
const Cafe = require("../Models/Cafe")
const verify = require('../verifyToken')
const { Promise } = require("mongoose")


router.post('/addOrder', async (req, res) => {

    const today = new Date()

    const user = req.body.user
    const cafe = req.body.cafe
    const transactionId = req.body.transactionId
    const table = req.body.table
    const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
    const time = `${today.getHours()}:${today.getMinutes()}`
    const isComplete = req.body.isComplete
    const data = req.body.data
    const discount = req.body.discount
    const totalAmount = req.body.totalAmount

    let newOrder = new Order({
        user,
        cafe,
        table,
        transactionId,
        date,
        time,
        isComplete,
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


router.post('/getCurrentOrders', async (req, res) => {

    const cafe = req.body.cafeId

    let today = new Date()
    let date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
    let currentOrders = []

    const time = today.getHours()

    try {

        const newCafe = await Cafe.findById(cafe)
        const orders = newCafe.orders

        for (let i = 0; i < orders.length; i++) {

            const OrderDetails = await Order.findById(orders[i])

            if (OrderDetails !== null) {

                if (OrderDetails.date === date && !OrderDetails.isComplete) {

                    if( time - 5 < (OrderDetails.time).split(':')[0] <= time ){
                        currentOrders.push( { table : OrderDetails.table , time , data  } )
                    }
                
                }

            }

        }

        res.json( currentOrders )


    } catch (e) { }


})

module.exports = router