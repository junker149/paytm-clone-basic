const express = require("express");
const { Account, User } = require("../db");
const { default: mongoose } = require("mongoose");
const { authMiddlewares } = require("../middlewares");
const router = express.Router();

router.get("/balance", authMiddlewares, async (req, res) => {
    try {
        const userID = req.userID;

        const account = await Account.findOne({
            userID: userID
        })

        const user = await User.findOne({
            _id: userID
        })

        return res.status(200).json({
            balance: account.balance,
            firstName: user.firstName
        });
    }
    catch(err){
        res.status(500).send("Internal Server Error!");
    }
})

router.post("/transfer", authMiddlewares, async(req, res) => {
    try{
        const session = await mongoose.startSession();
        const {to, amount} = req.body;
        const userID = req.userID;

        
        session.startTransaction();
        
        const sender_account = await Account.findOne({userID: userID}).session(session);
        
        if(sender_account.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance!"
            });
        }

        const receiver_account = await Account.findOne({userID: to}).session(session);

        if(!receiver_account){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Account!"
            });
        }

        await Account.updateOne({userID: userID}, {$inc: {balance: -amount}}).session(session);
        await Account.updateOne({userID: to}, {$inc: {balance: amount}}).session(session);

        await session.commitTransaction();
        return res.status(200).json({
            message: "Transaction Successful!"
        });
    }
    catch(err){
        return res.status(500).send("Internal Server Error!");
    }
})

module.exports = router;