const express = require("express");
const { signup } = require("../types");
const { User } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

router.post("/signup", async (req, res) => {
    try {
        console.log("Received signup request");

        const payload = req.body;
        console.log("Payload:", payload);

        const parsedPayload = signup.safeParse(payload);
        console.log("Parsed Payload:", parsedPayload);

        if (!parsedPayload.success) {
            console.log("Invalid input:", parsedPayload.error);
            return res.status(400).json({
                message: "Invalid input"
            });
        }

        const user = await User.findOne({ username: payload.username });
        console.log("User found:", user);

        if (user) {
            console.log("Email already taken");
            return res.status(409).json({
                message: "Email already taken"
            });
        }

        const USER = await User.create(payload);
        console.log("User created:", USER);

        const token = jwt.sign({ username: USER._id }, JWT_SECRET);
        console.log("JWT token created:", token);

        return res.status(200).json({
            message: "User Created Successfully!",
            tkn: token
        });
    } catch (err) {
        console.error("Internal Server Error:", err);
        return res.status(500).send("Internal Server Error!");
    }
});

module.exports = router;
