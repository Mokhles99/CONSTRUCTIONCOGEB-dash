const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const fs = require('fs'); 
const stream = require('stream');
const path = require('path');
const Carousel = require('../models/carousel.model');


exports.createCarousel = async (req, res) => {
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

    // Créer un nouveau Carousel avec les données du formulaire et les URL des fichiers Cloudinary
    const carousel = new Carousel({
     
      files: uploadedFiles
    });

    // Enregistrer le Carousel dans la base de données
    await carousel.save();

    res.status(201).json(carousel);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du Carousel", error });
  }
};

exports.getAllCarousels = async (req, res) => {
  try {
    const carousels = await Carousel.find();
    res.status(200).json(carousels);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des Carousels", error });
  }
};

exports.getCarouselById = async (req, res) => {
  try {
    const { id } = req.params; 
    const carousel = await Carousel.findById(id);
    if (!carousel) {
      return res.status(404).json({ message: "Carousel non trouvé" });
    }
    res.status(200).json(carousel);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du Carousel", error });
  }
};


exports.updateCarousel = async (req, res) => {
  try {
    const { id } = req.params;
    const carousel = await Carousel.findById(id);
    if (!carousel) {
      return res.status(404).json({ message: "Carousel non trouvé" });
    }

    // Mettre à jour les champs du Carousel avec les nouvelles données
    Object.keys(req.body).forEach(key => {
      carousel[key] = req.body[key];
    });

    // Vérifier si de nouveaux fichiers ont été téléchargés
    if (req.files && req.files.length > 0) {
      // Supprimer les anciens fichiers de Cloudinary
      await Promise.all(carousel.files.map(async (file) => {
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

      // Mettre à jour les fichiers du Carousel avec les nouvelles URL de Cloudinary
      carousel.files = uploadedFiles;
    }

    const updatedCarousel = await carousel.save();
    res.status(200).json(updatedCarousel);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du Carousel", error });
  }
};



exports.deleteCarousel = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCarousel = await Carousel.findByIdAndDelete(id);
    if (!deletedCarousel) {
      return res.status(404).json({ message: "Carousel non trouvé" });
    }
    res.status(200).json({ message: "Carousel supprimé avec succès", deletedCarousel });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du Carousel", error });
  }
};

// Implémentez les fonctions getAllCarousels, getCarouselById, updateCarousel et deleteCarousel dans le même format que ci-dessus.

exports.countCarousels = async (req, res) => {
  try {
    const carouselCount = await Carousel.countDocuments();
    res.status(200).json({ carouselCount });
  } catch (error) {
    console.error("Error counting carousels:", error);
    res.status(500).json({ message: "Error counting carousels", error: error.message });
  }
};