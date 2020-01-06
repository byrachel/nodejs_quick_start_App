// import d'Express
const express = require('express');

// création de l'application Express
const app = express();

// Faciliter les intéractions avec notre BDD MongoDB
const mongoose = require('mongoose');

// Connexion à notre BDD
mongoose.connect('mongodb+srv://@cluster0-jdb4r.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Import du module Body Parser qui transforme le corps de la requête en JSON
const bodyParser = require('body-parser');

// Récupérer le schéma / modèle
const Thing = require('./models/Thing');

// 1er middleware exécuté : Gestion de l'erreur CORS (cross origin ressource sharing)
app.use((req, res, next) => {
    // Ajout des entêtes : "headers"
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// J'appelle la méthode bodyParser pour toutes les routes
app.use(bodyParser.json());

// Méthode POST pour récupérer des données via un formulaire
app.post('/api/stuff', (req, res, next) => {
    // Corps de la requête = req.body (chaque élément : req.body.title)
    console.log(req.body);
    // J'élimine l'ID automatique de Mongo car pas besoin en frontend
    delete req.body._id;
    // J'instancie l'objet avec mon modèle
    // L'utilisation du mot-clé new avec un modèle Mongoose crée par défaut un champ_id
    const thing = new Thing({
    // Cette syntaxe permet d'appeler tout l'objet en une seule ligne
      ...req.body
    });
    // Enregistrement des données dans la BDD
    thing.save()
    // Envoie d'une réponse
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    // Gestion des erreurs
      .catch(error => res.status(400).json({ error }));
  });

// Methode PUT pour mettre à jour un objet + :id comme paramètre
app.put('/api/stuff/:id', (req, res, next) => {
    // Méthode updateOne avec 2 paramètres : l'objet de comparaion (celui qu'on modifie)
    // et le nouvel objet en précisant que lID correspond à celui des paramètres.
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

// Méthode DELETE pour supprimer un objet 
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    });

// Méthode GET + :id -> permet de le rendre accessible comme paramètre
app.get('/api/stuff/:id', (req, res, next) => {
    // Méthode findOne + indicateur de comparaison : _id
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

// Méthode GET qui permet d'envoyer des données au frontend
app.get('/api/stuff', (req, res, next) => {
    // La méthode find permet de trouver tous les éléments dans la BDD
    Thing.find()
        // Things est le nom du tableau dans le BDD (pluriel du nom du schéma)
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  });

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
module.exports = app;