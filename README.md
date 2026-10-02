# Checkpoint Mongoose

Gestion d'une base de données MongoDB Atlas avec Mongoose : modèle `Person` et opérations CRUD (création, recherche, mise à jour, suppression).

## Prérequis

- [Node.js](https://nodejs.org) installé
- Un cluster MongoDB Atlas (offre gratuite M0)

## Installation

```bash
git clone https://github.com/ranim-khemiri/Mongoose.js.git
cd Mongoose.js
npm install
```

Créer un fichier `.env` à la racine du projet :

```
MONGO_URI=mongodb+srv://UTILISATEUR:MOTDEPASSE@cluster0.xxxxx.mongodb.net/checkpoint?retryWrites=true&w=majority
```

Le fichier `.env` n'est pas envoyé sur GitHub (il est dans `.gitignore`).

## Lancement

```bash
node app.js
```

## Modèle Person

| Champ | Type | Remarque |
|---|---|---|
| `name` | String | obligatoire |
| `age` | Number | |
| `favoriteFoods` | [String] | tableau de chaînes |

## Fonctions implémentées (`app.js`)

| Fonction | Méthode Mongoose |
|---|---|
| `createAndSavePerson` | `document.save()` |
| `createManyPeople` | `Model.create()` |
| `findPeopleByName` | `Model.find()` |
| `findOneByFood` | `Model.findOne()` |
| `findPersonById` | `Model.findById()` |
| `findEditThenSave` | `findById()`, `push()`, `save()` |
| `findAndUpdate` | `findOneAndUpdate()` avec `{ new: true }` |
| `removeById` | `findByIdAndDelete()` |
| `removeManyPeople` | `deleteMany()` |
| `queryChain` | `find()`, `sort()`, `limit()`, `select()`, `exec()` |

`findByIdAndDelete()` et `deleteMany()` remplacent `findByIdAndRemove()` et `remove()`, supprimées des versions récentes de Mongoose.

## Structure du projet

```
mongoose.js/
├── models/
│   └── Person.js
├── app.js
├── .env          (non envoyé sur GitHub)
├── .gitignore
└── package.json
```

## Technologies utilisées

- Node.js
- Mongoose
- MongoDB Atlas
- dotenv

## Auteur

Ranim Khemiri
