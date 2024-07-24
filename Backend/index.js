const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");
const JWT_SECRET = require("./config");

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', mainRouter);

app.get('/', (req, res) => {
    res.send("Hello World!");
})
app.listen(3000);