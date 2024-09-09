const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const fs = require('fs'); 
const stream = require('stream');
const path = require('path');
const Catalogue = require('../models/catalogue.model');


exports.createCatalogue = async (req, res) => {
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

    // Créer un nouveau Catalogue avec les données du formulaire et les URL des fichiers Cloudinary
    const catalogue = new Catalogue({
     
      files: uploadedFiles
    });

    // Enregistrer le Catalogue dans la base de données
    await catalogue.save();

    res.status(201).json(catalogue);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du Catalogue", error });
  }
};

exports.getAllCatalogues = async (req, res) => {
  try {
    const catalogues = await Catalogue.find();
    res.status(200).json(catalogues);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des Catalogues", error });
  }
};

exports.getCatalogueById = async (req, res) => {
  try {
    const { id } = req.params; 
    const catalogue = await Catalogue.findById(id);
    if (!catalogue) {
      return res.status(404).json({ message: "Catalogue non trouvé" });
    }
    res.status(200).json(catalogue);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du Catalogue", error });
  }
};


exports.updateCatalogue = async (req, res) => {
  try {
    const { id } = req.params;
    const catalogue = await Catalogue.findById(id);
    if (!catalogue) {
      return res.status(404).json({ message: "Catalogue non trouvé" });
    }

    // Mettre à jour les champs du Catalogue avec les nouvelles données
    Object.keys(req.body).forEach(key => {
      catalogue[key] = req.body[key];
    });

    // Vérifier si de nouveaux fichiers ont été téléchargés
    if (req.files && req.files.length > 0) {
      // Supprimer les anciens fichiers de Cloudinary
      await Promise.all(catalogue.files.map(async (file) => {
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

      // Mettre à jour les fichiers du Catalogue avec les nouvelles URL de Cloudinary
      catalogue.files = uploadedFiles;
    }

    const updatedCatalogue = await catalogue.save();
    res.status(200).json(updatedCatalogue);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du Catalogue", error });
  }
};



exports.deleteCatalogue = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCatalogue = await Catalogue.findByIdAndDelete(id);
    if (!deletedCatalogue) {
      return res.status(404).json({ message: "Catalogue non trouvé" });
    }
    res.status(200).json({ message: "Catalogue supprimé avec succès", deletedCatalogue });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du Catalogue", error });
  }
};

// Implémentez les fonctions getAllCatalogues, getCatalogueById, updateCatalogue et deleteCatalogue dans le même format que ci-dessus.

exports.countCatalogues = async (req, res) => {
  try {
    const catalogueCount = await Catalogue.countDocuments();
    res.status(200).json({ catalogueCount });
  } catch (error) {
    console.error("Error counting catalogues:", error);
    res.status(500).json({ message: "Error counting catalogues", error: error.message });
  }
};