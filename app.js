// Chargement des variables du fichier .env
require("dotenv").config();
const mongoose = require("mongoose");
const Person = require("./models/Person");

// Connexion à MongoDB Atlas (l'URI est lu dans .env)
mongoose.connect(process.env.MONGO_URI);

// Convertit une promesse en convention Node.js done(err, data)
const handle = (promise, done) =>
  promise.then((data) => done(null, data)).catch((err) => done(err));

// 1. Créer et sauvegarder une personne avec document.save()
const createAndSavePerson = (done) => {
  const person = new Person({ name: "John", age: 25, favoriteFoods: ["pizza", "pasta"] });
  handle(person.save(), done);
};

// 2. Créer plusieurs personnes avec Model.create()
const createManyPeople = (arrayOfPeople, done) => {
  handle(Person.create(arrayOfPeople), done);
};

// 3. Trouver toutes les personnes ayant un nom donné avec Model.find()
const findPeopleByName = (personName, done) => {
  handle(Person.find({ name: personName }), done);
};

// 4. Trouver une personne ayant un aliment favori donné avec Model.findOne()
const findOneByFood = (food, done) => {
  handle(Person.findOne({ favoriteFoods: food }), done);
};

// 5. Trouver une personne par son _id avec Model.findById()
const findPersonById = (personId, done) => {
  handle(Person.findById(personId), done);
};

// 6. Rechercher, modifier, puis enregistrer : ajouter "hamburger"
const findEditThenSave = (personId, done) => {
  const promise = Person.findById(personId).then((person) => {
    person.favoriteFoods.push("hamburger");
    person.markModified("favoriteFoods");
    return person.save();
  });
  handle(promise, done);
};

// 7. Mettre l'âge à 20 avec findOneAndUpdate() ({ new: true } renvoie le document mis à jour)
const findAndUpdate = (personName, done) => {
  handle(Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }), done);
};

// 8. Supprimer par _id (findByIdAndRemove est remplacé par findByIdAndDelete)
const removeById = (personId, done) => {
  handle(Person.findByIdAndDelete(personId), done);
};

// 9. Supprimer toutes les "Mary" (Model.remove est remplacé par deleteMany)
const removeManyPeople = (done) => {
  handle(Person.deleteMany({ name: "Mary" }), done);
};

// 10. Chaîne de recherche : burritos, tri par nom, 2 max, sans l'âge
const queryChain = (done) => {
  handle(
    Person.find({ favoriteFoods: "burritos" }).sort({ name: 1 }).limit(2).select("-age").exec(),
    done
  );
};

// ---------- Test de toutes les fonctions ----------
const run = (fn, ...args) =>
  new Promise((resolve, reject) =>
    fn(...args, (err, data) => (err ? reject(err) : resolve(data)))
  );

async function main() {
  try {
    await mongoose.connection.asPromise();
    console.log("Connecté à MongoDB Atlas");

    await Person.deleteMany({}); // repart d'une base propre

    console.log("\n1. save() :", await run(createAndSavePerson));

    const arrayOfPeople = [
      { name: "Mary", age: 30, favoriteFoods: ["burritos", "salad"] },
      { name: "Mary", age: 22, favoriteFoods: ["pizza"] },
      { name: "Alice", age: 28, favoriteFoods: ["burritos", "sushi"] },
      { name: "Bob", age: 35, favoriteFoods: ["burritos", "steak"] }
    ];
    console.log("\n2. create() :", await run(createManyPeople, arrayOfPeople));
    console.log("\n3. find() Mary :", await run(findPeopleByName, "Mary"));

    const sushiPerson = await run(findOneByFood, "sushi");
    console.log("\n4. findOne() sushi :", sushiPerson);
    console.log("\n5. findById() :", await run(findPersonById, sushiPerson._id));
    console.log("\n6. find/edit/save :", await run(findEditThenSave, sushiPerson._id));
    console.log("\n7. findOneAndUpdate() :", await run(findAndUpdate, "Bob"));
    console.log("\n8. findByIdAndDelete() :", await run(removeById, sushiPerson._id));
    console.log("\n9. deleteMany() Mary :", await run(removeManyPeople));
    console.log("\n10. Chaîne de recherche :", await run(queryChain));
  } catch (err) {
    console.error("Erreur :", err);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  createAndSavePerson, createManyPeople, findPeopleByName, findOneByFood,
  findPersonById, findEditThenSave, findAndUpdate, removeById,
  removeManyPeople, queryChain
};
