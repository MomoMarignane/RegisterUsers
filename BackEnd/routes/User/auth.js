/*
** EPITECH PROJECT, 2023
** API
** File description:
** auth.js
*/

const Utilisateur = require('../../Models/User.js')
const express = require('express')
const authRouter = express()
const bcrypt = require('bcrypt')


authRouter.post('/signup', async (req, res) => {
    try {
        const {name, age, mail, password} = req.body;
        const newpassword = await bcrypt.hash(password, Math.floor(Math.random() * (15 - 10 + 1)) + 10);
        const utilisateur = new Utilisateur({
            name: name,
            age: age,
            mail: mail,
            password: newpassword,
            online: true
        });
        if (age < 18)
            return res.status(422).send("You need to have 18 years old.")
        const user = await Utilisateur.findOne({mail})
        if (user)
            return res.status(409).send("Account " + mail + " exist. Signin now !")
        await utilisateur.save();
        res.status(200).json(utilisateur);
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
});

authRouter.post('/signin', async (req, res) => {
    try {
        const { mail, password } = req.body;
        const user = await Utilisateur.findOne({ mail });
        if (!user) {
            return res.status(404).send("Mail not found. Do you want to create a new account with " + mail + " ?");
        }
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(401).send("Wrong password. Try again");
        }
        await Utilisateur.findOneAndUpdate({ mail }, { online: true });
        res.status(200).send("Connected to " + mail);
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
});


authRouter.post('/signout', async (req, res) => {
    try {
        const {mail} = req.body
        console.log(mail)
        const user = await Utilisateur.findOneAndUpdate({mail}, {online: false});
        if (!user)
            return res.status(404).send("Mail not found. Do you wan't create new account with " + mail + " ?")
        user.online = false;
        console.log(user)
        res.status(200).send(mail + " is been disconnected");
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
});

authRouter.post('/patch/:_id', async (req, res) => {
    try {
        const id = req.params;
        const update = req.body;
        if (update.password) {
            update.password = await bcrypt.hash(update.password, Math.floor(Math.random() * (15 - 10 + 1)) + 10);
        }
        const userUpdate = await Utilisateur.findByIdAndUpdate(id, update, {new: true});
        if (!userUpdate)
            return res.status(404).send("Mail not found")
        res.status(200).send(userUpdate.mail + " modification confirmed")
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
});

// authRouter.post('/delete/:_id', async (req, res) => {
//     try {
//         const id = req.params;
//         const update = req.body;
//     } catch (e) {}
// })

module.exports = authRouter