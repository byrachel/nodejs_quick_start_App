// Import de Mongoose
const mongoose = require('mongoose');

// Import de Mongoose Unique Validator qui permet de vérifier qu'une donnée est unique
// Deux utilisateurs ne peuvent pas avoir la même adresse mail par exemple
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma de données
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// On applique la méthode Unique Validator au schema
userSchema.plugin(uniqueValidator);

// Export du modèle avec les arguments : (nom du modèle, schéma à utiliser)
module.exports = mongoose.model('User', userSchema);