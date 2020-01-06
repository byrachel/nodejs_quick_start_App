const express = require('express');

const router = express.Router();

// Import du controller
const stuffCtrl = require('../controllers/stuff');

// Méthode POST pour récupérer des données via un formulaire
router.post('/', stuffCtrl.createThing);

// Methode PUT pour mettre à jour un objet + :id comme paramètre
router.put('/:id', stuffCtrl.modifyThing);

// Méthode DELETE pour supprimer un objet 
router.delete('/:id', stuffCtrl.deleteThing);

// Méthode GET + :id -> permet de le rendre accessible comme paramètre
router.get('/:id', stuffCtrl.getOneThing);

// Méthode GET qui permet d'envoyer des données au frontend
router.get('/', stuffCtrl.getAllStuff);

module.exports = router;