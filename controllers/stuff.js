// Récupérer le schéma / modèle
const Thing = require('../models/Thing');

// Logique de la route POST : enregistre les données d'un formulaire
exports.createThing = (req, res, next) => {
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
}

// Logique de la route PUT pour mettre à jour un objet + :id comme paramètre
exports.modifyThing = (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    // Méthode updateOne avec 2 paramètres : l'objet de comparaion (celui qu'on modifie)
    // et le nouvel objet en précisant que lID correspond à celui des paramètres.
    Thing.updateOne({ _id: req.params.id }, thing)
      .then(() => res.status(201).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
}

// Logique de la route DELETE pour supprimer un objet + :id comme paramètre
exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
}

// Logique de la route GET pour afficher un seul objet + :id comme paramètre
exports.getOneThing = (req, res, next) => {
    // Méthode findOne + indicateur de comparaison : _id
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
}

// Logique de la route GET qui permet d'envoyer toutes les données au frontend
exports.getAllStuff = (req, res, next) => {
    // La méthode find permet de trouver tous les éléments dans la BDD
    Thing.find()
        // Things est le nom du tableau dans le BDD (pluriel du nom du schéma)
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
}