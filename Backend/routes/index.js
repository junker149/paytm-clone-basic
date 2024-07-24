const express = require("express");
const mainRouter = express.Router();
const UserRouter = require("./user");
const AccountRouter = require("./account");

mainRouter.use("/user", UserRouter);
mainRouter.use("/account", AccountRouter);

module.exports = mainRouter;