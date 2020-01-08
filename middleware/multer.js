const multer = require('multer');

// Différents types d'extension possible :
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

// Création d'un objet de configuration pour multer
// méthode diskStorage = enregistrement sur le disque
const storage = multer.diskStorage({
    // Où enregistrer les fichier :
    destination: (req, file, callback) => {
        callback(null, 'img')
    },
    // Config du nom de fichier à utiliser :
    filename: (req, file, callback) => {
        // nom d'origine en supprimant les espaces par des _
        const name = file.originalname.split(' ').join('_');
        // générer l'extension du fichier
        const extension = MIME_TYPES[file.mimetype];
        // Ajout du timestamp pour rendre le nom de fichier unique
        callback(null, name + Date.now() + '.' + extension)
    }
})

// Nous précisons que nous ne gérons que les fichiers 'image'
module.exports = multer({ storage }).single(('image'));