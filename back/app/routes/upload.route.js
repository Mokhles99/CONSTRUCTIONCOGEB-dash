const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dlp3bn4yr',
  api_key: '241549437291335',
  api_secret: 'Cn9oM8rXApFHPvsfOh7HNa5BL-0'
});

router.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      folder: 'files'
    });
    // Gérer les résultats du téléchargement, par exemple enregistrer l'URL dans la base de données
    res.status(200).json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier vers Cloudinary :', error);
    res.status(500).json({ success: false, message: 'Erreur lors du téléchargement du fichier vers Cloudinary' });
  }
});

module.exports = router;
