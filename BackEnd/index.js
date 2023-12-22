/*
** EPITECH PROJECT, 2023
** API  JS MongoDB
** File description:
** index.js
*/

const express = require('express');
// const utilisateur = require('Models/User.js')
const auth = require('./routes/User/auth.js')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
const port = 8080;

//mongodb+srv://capriSun:<password>@cluster0.4yd5nch.mongodb.net/?retryWrites=true&w=majority

const dbURL = "mongodb+srv://capriSun:xS4CYeR96ISUZhrv@cluster0.4yd5nch.mongodb.net/projet1";

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('been connected from database');
})
.catch((err) => {
    console.error('Error: ' + err);
});

// const collectdb = mongoose.Collection(dbURL, {})


app.use(cors());
app.use(express.json());
app.use(auth);

app.get('/', async (req, res) => {
    return res.status(200).json({msg: 'Man !'});
});

app.listen(port, function () {
    console.log("deployed in " + port);
});


module.exports = app;