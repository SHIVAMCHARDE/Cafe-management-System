const router = require("express").Router()
const User = require("../Module/User")
const CryptoJS = require("crypto-js")
const crypto = require('crypto') //For Hashing
const dotenv = require("dotenv")
dotenv.config()
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');
const { create } = require("../Module/User")

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bhaveshanandpara12@gmail.com',
        pass: 'mbopuokvzssshhta'
    }
});

function createHash(data) {

    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(data).digest('hex') //Hashing of Data

}


router.post('/register', async (req, res) => {

    //declaring credentials
    const fullName = req.body.name
    const email = req.body.email

    const OTP = Math.floor(Math.random() * 10000)  //4 Digit OTP
    const timeLimit = 2 * 60 * 1000 // 2mins in milliseconds
    const expires = Date.now() + timeLimit


    console.log({ email, fullName, OTP, expires });

    const data = `${email}.${fullName}.${OTP}.${expires}` //Hash Data for JWT
    const hash = createHash(data)

    const fullHash = `${hash}.${expires}`

    var mailOptions = {
        from: 'bhaveshanandpara12@gmail.com',
        to: email,
        subject: 'OTP for Verification at Cafe Managment System',
        text: `your OTP is ${OTP}`
    };

    try {

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send('error') // if error occurs send error as response to client
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.json({ msg: "OTP Send Successfully", OTP, fullHash })

    } catch (e) {
        console.log(e);
        res.json("Error Occured")
    }

})

router.post('/login', async (req, res) => {

    //Decrlaring credentials
    const email = req.body.email
    const password = req.body.password

    console.log(email);

    try {
        const user = await User.findOne({ email })//Find User in Database by PhoneNo 
        try {

            var bytes = CryptoJS.AES.decrypt(user.userPassword, process.env.SECRET_KEY); //Decrypt the Encrypted Password
            var originalPass = bytes.toString(CryptoJS.enc.Utf8); //Original Password

            originalPass !== password &&
                res.status(401).json("Invalid Password")

        } catch (err) {
            res.json("Invalid Email")
        }

        const OTP = Math.floor(Math.random() * 1000000)  //6 Digit OTP
        const timeLimit = 2 * 60 * 1000 // 2mins in milliseconds
        const expires = Date.now() + timeLimit

        const data = `${email}.${OTP}.${expires}` //Hash Data for JWT
        const hash = crypto.createHmac('sha256', process.env.SECRET_KEY).update(data).digest('hex') //Hashing of Data

        const fullHash = `${hash}.${expires}` //hash with Expiry

        // client.messages.create({   //UnComment For only Checking ( Requires Money BRUHHHHHHHH !!!!!!!!!!!!)
        //     body : `Your OTP for LOGIN is ${OTP}`,
        //     from : +19106684570,
        //     to : `+91${phoneNo}`
        // }).then((msg) => {
        //     console.log(msg)
        // } ).catch( (err)=>{
        //     console.log(err)
        // })

        res.json({ email, hash: fullHash, password, OTP })
    } catch (err) {
        console.log(err)
    }

})

router.post('/verifyOTP', async (req, res) => {

    try {

        const email = req.body.email
        const fullName = req.body.fullName
        const hash = req.body.hash
        const OTP = req.body.otp
        let [hashValue, expires] = hash.split('.') //Taking the hash and Breaking it into hashValue and Exprixy

        let now = Date.now()

        if (now > parseInt(expires)) {
            return res.status(504).send({ msg: ' TimeOut' })  //IF Expired after 2 min
        }

        const data = `${email}.${fullName}.${OTP}.${expires}` //Hash for JWT

        const newCalculatedHash = createHash(data)

        console.log({ email, fullName, OTP, expires });


        if (newCalculatedHash === hashValue) {

            //If Newly created hash and hash provided by user is same
            // const accessToken = jwt.sign({ data: email }, { expiresIn: '30s' })

            const timeLimit = 15 * 60 * 1000 // 15mins in milliseconds
            const expires = Date.now() + timeLimit
            let newData = `${email}?${fullName}` //Hash for JWT

            let hash = CryptoJS.AES.encrypt(newData, process.env.SECRET_KEY).toString()//Encryptes Password
            hash = `${hash}.${expires}`

            res.status(202).send({ msg: "OTP Verified", hash })
        }

        else {
            res.json({ msg: "Invalid OTP" })
        }

    } catch (err) {
        console.log(err)
    }

})

router.post('/resetPassword', async (req, res) => {

    const hash = req.body.newHash
    const password = req.body.password


    let [hashValue, expires] = hash.split('.')

    let now = Date.now()

    if (now > parseInt(expires)) {
        res.status(404).json({ msg: "Timeout" })
    }

    let data = CryptoJS.AES.decrypt(hashValue, process.env.SECRET_KEY); //Decrypt the Encrypted Password
    data = data.toString(CryptoJS.enc.Utf8);

    let email = data.split('?')[0]
    let fullName = data.split('?')[1]


    try {

        const newUser = new User({
            userName: fullName,
            email: email,
            userPassword: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString() //Encryptes Password
        })

        const user = await newUser.save()
        
        res.status(201).json({msg : "user Created"})

    } catch (e) {
        res.json({ msg : "Error Ocurred"})
    }


    // const fullHash = `${hash}.${expires}` //hash with Expiry


    // res.status(200).send({ phoneNo, hash: fullHash, password, OTP })

})


module.exports = router