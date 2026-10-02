const mongoose = require("mongoose");

// Schéma du prototype Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // nom : obligatoire
  age: Number,                            // âge
  favoriteFoods: [String]                 // aliments préférés : tableau de chaînes
});

// Création du modèle à partir du schéma
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
