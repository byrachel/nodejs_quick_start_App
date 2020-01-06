// Import de Mongoose
const mongoose = require('mongoose');

// Création du schéma de données
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

// Export du modèle avec les arguments : (nom du modèle, schéma à utiliser)
module.exports = mongoose.model('Thing', thingSchema);