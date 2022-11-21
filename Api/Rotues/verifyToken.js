import { verify as _verify } from "jsonwebtoken";

function verify(req, res, next) {

    const token = req.headers.token // authHeader = 32424n34324hbhbb45

    if (authHeader) {

        _verify(token, process.env.SECRET_KEY, (err, userInfo) => { //Will take token and Secret KEy and Return Either Error or The Authenticated info
            if (err) res.status(403).json("Token is Invalid")
            req.user = userInfo;
            next()
        })
    } else {
        return res.status(401).json("You are not Authenticated !")
    }
}

export default verify; 