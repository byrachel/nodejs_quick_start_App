// import d'Express
const express = require('express');

// création de l'application Express
const app = express();

// Faciliter les intéractions avec notre BDD MongoDB
const mongoose = require('mongoose');

// Gestion des login mdp de la BDD
var dotenv = require('dotenv').config();

// Connexion à notre BDD
mongoose.connect( process.env.mongoDB ,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Import du module Body Parser qui transforme le corps de la requête en JSON
const bodyParser = require('body-parser');

// 1er middleware exécuté : Gestion de l'erreur CORS (cross origin ressource sharing)
app.use((req, res, next) => {
    // Ajout des entêtes : "headers"
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// import des routes
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

// J'appelle la méthode bodyParser pour toutes les routes
app.use(bodyParser.json());

// Enregistrement des routes dans l'application
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;


// // Méthode NEXT permet d'exécuter le middleware puis de passer au suivant
// app.use((req,res,next) => {
//     // Envoi d'un statut spécifique
//     res.status(201);
//     console.log('next');
//     next();
// })

// // réponse d'Express pour toute requête (en json)
// app.use((req,res) => {
//     res.json({message: 'requête reçue'});
// })

// Export : Permet d'accéder à ce fichier depuis toute l'application
