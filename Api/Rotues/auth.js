const router = require("express").Router()
const User = require("../Module/User")
const CryptoJS = require("crypto-js")
const crypto = require('crypto') //For Hashing
const dotenv = require("dotenv")
dotenv.config()
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');


// const accountSid = process.env.ACCOUNT_SID
// const authToken = process.env.AUTH_TOKEN
// const client = require('twilio')(accountSid, authToken);

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN
// const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN
// const crypto = require('crypto') //For Hashing
// const { json } = require("express")

// const smsKey = process.env.SMS_SECRET_KEY


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bhaveshanandpara12@gmail.com',
        pass: 'mbopuokvzssshhta'
    }
});




router.post('/register', async (req, res) => {


    //declaring credentials
    const fullName = req.body.name
    const email = req.body.email

    const OTP = Math.floor(Math.random() * 1000000)  //6 Digit OTP
    const timeLimit = 2 * 60 * 1000 // 2mins in milliseconds
    const expires = Date.now() + timeLimit

    const data = `${email}.${OTP}.${expires}` //Hash Data for JWT
    const hash = crypto.createHmac('sha256', process.env.SECRET_KEY).update(data).digest('hex') //Hashing of Data

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

        res.json({ msg: "OTP Send Successfully" , OTP ,fullHash })

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
        const password = req.body.password
        const hash = req.body.hash
        const OTP = req.body.OTP
        let [hashValue, expires] = hash.split('.') //Taking the hash and Breaking it into hashValue and Exprixy

        let now = Date.now()

        if (now > parseInt(expires)) {
            return res.status(504).send({ msg: ' TimeOut' })  //IF Expired after 2 min
        }

        const data = `${email}.${OTP}.${expires}` //Hash for JWT

        const newCalculatedHash = crypto.createHmac('sha256', process.env.SECRET_KEY).update(data).digest('hex') //Creates Hash Again

        if (newCalculatedHash === hashValue) {  //If Newly created hash and hash provided by user is same
            const accessToken = jwt.sign({ data: email }, `${JWT_AUTH_TOKEN}`, { expiresIn: '30s' })

            res.status(202).send({ msg: "device Confirmed" })
        }
        else {
            res.json("Invalid OTP")
        }

    } catch (err) {
        console.log(err)
    }



})

router.post('/resetPassword', async (req, res) => {

    const phoneNo = req.body.phoneNo

    const OTP = Math.floor(Math.random() * 1000000)  //6 Digit OTP
    const timeLimit = 2 * 60 * 1000 // 2mins in milliseconds
    const expires = Date.now() + timeLimit

    const data = `${phoneNo}.${OTP}.${expires}` //Hash Data for JWT
    const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex') //Hashing of Data

    const fullHash = `${hash}.${expires}` //hash with Expiry

    // client.messages.create({   //UnComment For only Checking ( Requires Money BRUHHHHHHHH !!!!!!!!!!!!)
    //     body : `Your OTP for Reset Password is ${OTP}`,
    //     from : +19106684570,
    //     to : `+91${phoneNo}`
    // }).then((msg) => {
    //     console.log(msg)
    // } ).catch( (err)=>{
    //     console.log(err)
    // })

    res.status(200).send({ phoneNo, hash: fullHash, password, OTP })

})


module.exports = router