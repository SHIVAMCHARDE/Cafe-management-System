const router = require("express").Router()
const Dish = require('../Models/Dish')
const verify = require('../verifyToken')
const multer = require('multer');
const Cafe = require("../Models/Cafe");

const storage = multer.diskStorage({ // notice you are calling the multer.diskStorage() method here, not multer()
    destination: function (req, file, cb) {
        cb(null, '../cafe/public/Media/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage })


router.post('/addNewDish', upload.single('image'), async (req, res) => {

    const data = JSON.parse(req.body.data)

    const dishName = data.dishName
    const isVeg = data.isVeg
    const category = data.category
    const price = data.price
    const cafe = data.cafe
    const desc = data.desc
    const profileImg = (req.file.path).split('Media')[1]

    try {

        let cafeDetails = await Cafe.findById(cafe)
        let dish = null

        try {

            dish = await Dish.findOne({ dishName, cafe })

        } catch (e) { }

        if (dish === null) {

            let newDish = new Dish({ dishName, isVeg, desc, category, price, cafe, profileImg })
            newDish = await newDish.save()

            let dishes = cafeDetails.dishes

            dishes.push(newDish._id)

            let parentCafe = await Cafe.updateOne({ _id: cafe }, {
                $set: { dishes: dishes }
            })
            res.json("New Dish Added Succesfully")
        }

        else { return res.json("Dish Already Exists") }



    } catch (e) {

        console.log(e);
        return res.json("Error Occurred while adding the dish")

    }


})

router.post('/deleteDish', upload.single('image'), async (req, res) => {

    const data = JSON.parse(req.body.data)

    try {


        const dish = await Dish.findById(data.id)
        const cafeId = dish.cafe
        let dishId = dish._id

        const cafe = await Cafe.findById(cafeId)
        let dishes = cafe.dishes

        const index = dishes.indexOf(dishId);
        if (index > -1) { // only splice array when item is found
            dishes.splice(index, 1); // 2nd parameter means remove one item only
        }

        await Cafe.findByIdAndUpdate({ _id: cafeId }, { $set: { dishes: dishes } })

        dish.remove()

        res.json('Dish Deleted Successfully')


    } catch (e) {
        console.log(e);
        res.json("error occured during deleting Dish Item")

    }



})

router.post('/getDish', async (req, res) => {

    const id = req.body.id
    console.log(id)

    try {

        const dish = await Dish.findById(id)
        res.json(dish)


    } catch (e) {
        console.log(e);
        res.json("error occured during deleting Dish Item")

    }



})

module.exports = router