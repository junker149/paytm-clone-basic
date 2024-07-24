const express = require("express");
const { signup, signin, updateBody } = require("../types");
const { User, Account } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddlewares } = require("../middlewares");

router.post("/signup", async (req, res) => {
    try {
        const payload = req.body;
        const parsedPayload = signup.safeParse(payload);

        if (!parsedPayload.success) {
            return res.status(400).json({
                message: "Invalid Inputs"
            });
        }

        const user = await User.findOne({
            email: payload.email
        });

        if (user){
            return res.status(409).json({
                message: "Email already taken"
            });
        }

        const USER = await User.create(payload);

        await Account.create({
            userID: USER._id,
            balance: 1 + Math.random() * 10000
        })

        const token = jwt.sign({ userID: USER._id }, JWT_SECRET);

        return res.status(200).json({
            message: "User Created Successfully!",
            tkn: token
        });
    }
    catch(err){
        return res.status(500).send("Internal Server Errorpp!");
    }
    
})

router.post("/signin", async (req, res) => {
    try{
        const payload = req.body;
        const parsedPayload = signin.safeParse(payload);
        // console.log("1");
        
        if(!parsedPayload.success){
            return res.status(400).json({
                message: "Invalid Inputs"
            });
        }
        // console.log("2");
        
        const USER = await User.findOne({
            email: payload.email
        });
        // console.log(USER);
        
        const token = jwt.sign({ userID : USER._id}, JWT_SECRET);
        
        // console.log(token);
        return res.status(200).json({
            tkn: token
        });
    }
    catch(err){
        return res.status(500).send("Internal Server Error!");
    }
})

router.post("/me", authMiddlewares, async (req, res) => {
    res.status(200).json({
        code: 200
    })
})

router.put('/', authMiddlewares, async (req, res) => {
    try{
        const payload = req.body;
        const parsedPayload = updateBody.safeParse(payload);

        if(!parsedPayload.success){
            return res.status(411).json({
                message: "Wrong Input!"
            });
        }

        await User.updateOne(
            { id_: req.userID },
            { payload }
        )

        return res.status(200).json({});
    }
    catch(err){
        return res.status(500).send("Internal Server Error!")
    }
})

router.get('/bulk', authMiddlewares , async (req, res) => {
    try{
        const filter = req.query.filter;

        const USERS = await User.find({
            $or : [ 
                {firstName: {"$regex" : filter, "$options": "i" }},
                {lastName: {"$regex" : filter, "$options": "i" }} 
            ] 
        })
        
        res.status(200).json({
            users: USERS.map((user) => ({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userID: user._id
            }))
        });
    }
    catch(err){
        return res.status(500).send("Internal Server Error!");
    }
})

module.exports = router;