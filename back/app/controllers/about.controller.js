const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const fs = require('fs'); 
const stream = require('stream');
const path = require('path');
const About = require('../models/about.model');


exports.createAbout = async (req, res) => {
  try {
    // Créer un tableau de fichiers à partir des fichiers téléchargés
    const files = req.files.map(file => ({
      public_id: file.filename, // Utilisez le nom de fichier temporaire généré par multer comme public_id
      url: file.path // Utilisez le chemin local du fichier temporaire comme URL temporaire
    }));

    // Ajouter les fichiers à Cloudinary et obtenir les URL Cloudinary
    const uploadedFiles = await Promise.all(files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.url);
      return {
        public_id: result.public_id,
        url: result.secure_url
      };
    }));

    // Créer un nouveau About avec les données du formulaire et les URL des fichiers Cloudinary
    const about = new About({
     
      files: uploadedFiles
    });

    // Enregistrer le About dans la base de données
    await about.save();

    res.status(201).json(about);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du About", error });
  }
};

exports.getAllAbouts = async (req, res) => {
  try {
    const abouts = await About.find();
    res.status(200).json(abouts);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des Abouts", error });
  }
};

exports.getAboutById = async (req, res) => {
  try {
    const { id } = req.params; 
    const about = await About.findById(id);
    if (!about) {
      return res.status(404).json({ message: "About non trouvé" });
    }
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du About", error });
  }
};


exports.updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findById(id);
    if (!about) {
      return res.status(404).json({ message: "About non trouvé" });
    }

    // Mettre à jour les champs du About avec les nouvelles données
    Object.keys(req.body).forEach(key => {
      about[key] = req.body[key];
    });

    // Vérifier si de nouveaux fichiers ont été téléchargés
    if (req.files && req.files.length > 0) {
      // Supprimer les anciens fichiers de Cloudinary
      await Promise.all(about.files.map(async (file) => {
        await cloudinary.uploader.destroy(file.public_id);
      }));

      // Télécharger les nouveaux fichiers sur Cloudinary
      const uploadedFiles = await Promise.all(req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return {
          public_id: result.public_id,
          url: result.secure_url
        };
      }));

      // Mettre à jour les fichiers du About avec les nouvelles URL de Cloudinary
      about.files = uploadedFiles;
    }

    const updatedAbout = await about.save();
    res.status(200).json(updatedAbout);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du About", error });
  }
};



exports.deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAbout = await About.findByIdAndDelete(id);
    if (!deletedAbout) {
      return res.status(404).json({ message: "About non trouvé" });
    }
    res.status(200).json({ message: "About supprimé avec succès", deletedAbout });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du About", error });
  }
};

// Implémentez les fonctions getAllAbouts, getAboutById, updateAbout et deleteAbout dans le même format que ci-dessus.

exports.countAbouts = async (req, res) => {
  try {
    const aboutCount = await About.countDocuments();
    res.status(200).json({ aboutCount });
  } catch (error) {
    console.error("Error counting abouts:", error);
    res.status(500).json({ message: "Error counting abouts", error: error.message });
  }
};