const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Le nom est requis"] 
  },
  email: { 
    type: String, 
    required: [true, "L'email est requis"], 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Email invalide"]
  },
  age: { 
    type: Number, 
    required: [true, "L'âge est requis"],
    min: [0, "L'âge ne peut pas être négatif"],
    max: [85, "L'âge maximum est 85"]
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model("User", userSchema);