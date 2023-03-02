const express = require('express');
const cors = require("cors");
const randomWords = require('random-words');
require('dotenv').config();

const { connection } = require('./configs/db');
const { UserModel } = require('./models/userModel');

const app = express();
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.post("/adduser", async (req, res) => {
    const userdata = req.body;
    try {
        const data = new UserModel(userdata);
        await data.save()
        res.send("User added Successfully")
    }
    catch (err) {
        console.log(err)
        res.send("Unable to add user", err)
    }
})

app.get("/user", async (req, res) => {

    try {
        const userss = await UserModel.find();
        res.send(userss)
    }
    catch (err) {
        console.log(err)
        res.send("Error in getting data please try again later!")
    }
})

app.get("/quiz", async (req, res) => {
    const difficulty = req.query.difficulty;

    if (difficulty == "easy") {

        let word = await randomWords();
        res.send(word)
    } else if (difficulty == "medium") {
        let word = await randomWords({ exactly: 1, maxLength: 6 });
        res.send(word)
    } else if (difficulty == "hard") {
        let word = await randomWords({ exactly: 1, maxLength: 8 });
        res.send(word)
    }
})

app.patch("/user/:id", async (req, res) => {
    const ID = req.params.id
    const score = req.body
    try {
        await UserModel.findByIdAndUpdate({ "_id": ID }, score)
        res.send("patched success")
    } catch (error) {
        res.send("patch error")
    }
})


app.listen(8080, async () => {
    try {
        await connection;
        console.log("Connected to DataBase")
    }
    catch (err) {
        console.log("unable to connect to DataBase");
    }
    console.log("running on port 8080")
})