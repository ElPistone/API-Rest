const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Charger les variables d'environnement
dotenv.config();

// Initialiser Express
const app = express();

// Middlewares
app.use(express.json()); // Pour parser le JSON
app.use(cors()); // Pour autoriser les requêtes cross-origin

// Port du serveur
const PORT = process.env.PORT || 5000;

// Route de test
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Express.js avec MongoDB !");
});
// Importer les routes utilisateur
const userRoutes = require('./routes/userRoutes');


// Utiliser les routes utilisateur
app.use('/api/users', userRoutes);

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connexion à MongoDB réussie"))
  .catch((err) => console.log("❌ Erreur de connexion :", err));

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});