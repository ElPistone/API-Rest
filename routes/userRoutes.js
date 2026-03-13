const express = require("express");
const User = require("../models/User");
const router = express.Router();

// @route   POST /api/users
// @descripton    Créer un nouvel utilisateur
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ 
      message: error.message,
      errors: error.errors 
    });
  }
});

// @route   GET /api/users
// @description    Récupérer tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Correction: find() au lieu de findAll()
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/users/:id
// @description    Récupérer un utilisateur par ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Correction: findById()
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/users/:id
// @description    Mettre à jour un utilisateur
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { 
        new: true, // Retourne l'utilisateur modifié
        runValidators: true // Valide les données avant mise à jour
      }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/users/:id
// @description    Supprimer un utilisateur
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;