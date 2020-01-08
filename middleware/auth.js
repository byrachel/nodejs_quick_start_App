const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // J'utilise le header de la requête
        // Je récupère un tableau avec le bearer + token
        const token = req.headers.authorization.split(' ')[1];
        // Vérification du token
        const decodedToken = jwt.verify(token, 'MY_SUPER_SECRET_TOKEN')
        // Une fois le token vérifié je peux récupérer le userId qui est dans l'objet user
        const userId = decodedToken.userId;
        // Vérification que le userID correspond à celui du token
        if(req.body.userID && req.body.userID !== userId) {
            // Si l'ID est différent de celui de la requête, il est renvoyé
            throw 'User ID non valable';
        } else {
            // Si l'ID est bien authentifié, je passe au middleware suivant
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authetifiée'})
    }
};