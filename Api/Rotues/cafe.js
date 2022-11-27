const router = require("express").Router()
const Cafe = require("../Module/Cafe")
const User = require("../Module/User")
const verify = require('../verifyToken')


router.post('/registerCafe', verify ,async (req, res) => {

    const cafeName = req.body.cafeName
    const subtitle = req.body.subtitle
    const address = req.body.address
    const city = req.body.city
    const coordinates = req.body.coords
    const profileImg = req.body.profileImg
    let owner = req.body.owner

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
    console.log(table)

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