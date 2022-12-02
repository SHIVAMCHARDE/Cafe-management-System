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


router.post('/addNewDish', upload.single('image'), verify, async (req, res) => {

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

router.post( '/deleteDish' , verify, async(req,res)=>{

    const data = req.body.data
    console.log(data)

    try{

        const dish = await Dish.findById(data.id)

    }catch(e){ }



})

module.exports = router