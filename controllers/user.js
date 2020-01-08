// Import d'un module pour hasher le mot de passe
const bcrypt = require('bcrypt');
// Import du modèle User
const User = require('../models/User');
// Import de la solution de gestion des TOKEN
const jwt = require('jsonwebtoken');

exports.signup = (req,res,next) => {
    // Appelle de la fonction pour hasher le mot de passe
    // 10 = 10 tours de l'algorythme de hashage (salt)
    bcrypt.hash(req.body.password, 10)
    // Je récupère le hash (mot de passe crypté)
    .then(hash => {
        // Je crée un nouvel utilisateur
        const user = new User({
            email: req.body.email,
            password: hash
        });
        // J'enregitre le user dans la BDD
        user.save()
        .then(() => res.status(201).json({ message: 'utilisateur créé.' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {
    // Trouver le user dans la BDD qui correspond à l'email saisi
    User.findOne({ email: req.body.email })
    .then(user => {
        // Vérifier si on a récupéré un user
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        // Je compare le mot de passe à celui en BDD
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
            // Si la comparaison n'est pas bonne
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
            res.status(200).json({
                userId: user._id,
                // Création du token de la session / authentifie les requêtes
                // .sign() = méthode pour encoder un token
                token: jwt.sign(
                    // 1er argument : données à encoder (payload)
                    { userId: user._id },
                    // 2ème argument : clé secrète pour l'encodage
                    'MY_SUPER_SECRET_TOKEN',
                    // 3ème argument : expiration du token
                    { expiresIn: '24h' }
                  )
            });
        })
        // En cas d'erreur serveur
        .catch(error => res.status(418).json({ error }));
    })
    // Si l'utilisateur a un problème de connexion lié à mongoDB - erreur serveur
    .catch(error => res.status(500).json({ error }));
};