const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

const authMiddlewares = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            msg: "wrong bitch",
            code: 404
        });
    }

    // console.log("token received")

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userID = decoded.userID;
        next();
    }
    catch(err){
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddlewares
}