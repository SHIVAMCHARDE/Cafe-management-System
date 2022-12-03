const router = require("express").Router()
const Cafe = require("../Models/Cafe")
const User = require("../Models/User")
const verify = require('../verifyToken')
const multer = require('multer')

const storage = multer.diskStorage({ // notice you are calling the multer.diskStorage() method here, not multer()
    destination: function (req, file, cb) {
        cb(null, '../cafe/public/Media/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage })


router.post('/registerCafe', upload.single('image')  ,async (req, res) => {

    const data = JSON.parse(req.body.data)

    const cafeName = data.cafeName
    const subtitle = data.subtitle
    const address = data.address
    const city = data.city
    const coordinates = data.coords
    const profileImg = req.file.path
    let owner = data.owner


    let user = req.user
    let cafe = null

    console.log(coordinates);

    owner = await User.findOne({owner})

    console.log(cafe);
    try{
        cafe = await Cafe.findOne({ coordinates })
    }catch(e){}
    
    if( cafe ){
        return res.json('Cafe Already Exists')
    }


    try{

        const newCafe = new Cafe({
            cafeName,
            subtitle,
            address,
            city,
            coordinates,
            profileImg,
            owner
        })

        const cafe = await newCafe.save()

        res.json(cafe)

    }catch(e){
        console.log(e);
        res.json(e)
    }
        

})

router.get( '/getCafeDetails' , async( req,res) =>{

    const id = req.query.id
    const table = req.query.table
    console.log(id)

    try{

        const cafe = await Cafe.findById(id);

        if( cafe === null ){
            throw new Error()
        }

        res.json(cafe)

    }catch(e){
        console.log(e);
        res.json("Cafe does not exist")
    }

})

router.post( '/getCafes' , async( req,res) =>{

    const city = req.body.city

    try{
        const cafes = await Cafe.find({city});
        res.json(cafes)

    }catch(e){
        console.log(e);
        res.json("Cafe does not exist")
    }

})

module.exports = router