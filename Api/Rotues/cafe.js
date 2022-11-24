const router = require("express").Router()
const Cafe = require("../Module/Cafe")
const User = require("../Module/User")
const verify = require('../verifyToken')


router.post('/registerCafe', verify ,async (req, res) => {

    const cafeName = req.body.cafeName
    const subtitle = req.body.subtitle
    const address = req.body.address
    const profileImg = req.body.profileImg
    let owner = req.body.owner

    let user = req.user

    // console.log(user);

    owner = await User.findOne({owner})

    // console.log(owner);

    try{

        const newCafe = new Cafe({
            cafeName,
            subtitle,
            address,
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


module.exports = router