/*
** EPITECH PROJECT, 2023
** API  JS MongoDB
** File description:
** User.js
*/

const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
    name: String,
    age: Number,
    mail: String,
    password: String,
    online: Boolean
},
{
    collection: 'utilisateurs'
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

module.exports = Utilisateur