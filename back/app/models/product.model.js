const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

  REF: {
    type: String,
    required: [false, "Veuillez entrer le ref du produit"]
  },
  name: {
    type: String,
    required: [true, "Veuillez entrer le nom du produit"]
  },
  description: {
    type: String,
    required: [false, "Veuillez entrer la description du produit"]
  },

  famille: {
    type: String,
    required: [true, "Veuillez spécifier la famille"],
    enum: [
      'Fer',
      'Ciment',
       'Brique'
     
    ]
  },
  categorie: {
    type: String,
    required: [true, "Veuillez spécifier la categorie"],
    enum: [
      'Normal',
      'Premium',
    ]
  },
  type: {
    type: String,
    required: [false, "Veuillez spécifier le type"],
    enum: [
      'Beton','Marchant',
      'Colle','Normal'
      
    ]
  },
  // files: [{
  //   public_id: String,
  //   url: String
  // }]
});

module.exports = mongoose.model('Product', productSchema);

 // FOR CONSTRUCTION *********************


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const productSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, "Veuillez entrer le nom du produit"]
//   },
//   description: {
//     type: String,
//     required: [true, "Veuillez entrer la description du produit"]
//   },

//   famille: {
//     type: String,
//     required: [true, "Veuillez spécifier la famille"],
//     enum: [
//       'Fer',
//       'Ciment',
     
//     ]
//   },

  
//   categorie: {
//     type: String,
//     required: [true, "Veuillez spécifier la categorie"],
//     enum: [
//       'Normal',
//       'Premium',
     
//     ]
//   },
//   type: {
//     type: String,
//     required: [false, "Veuillez spécifier le type"],
//     enum: [
//       'Beton','Marchant',
//       'Colle','Normal'
      
//     ]
//   },
//   files: [{
//     public_id: String,
//     url: String
//   }]
// });

// module.exports = mongoose.model('Product', productSchema);

// Bois *********************

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const productSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, "Veuillez entrer le nom du produit"]
//   },
//   description: {
//     type: String,
//     required: [true, "Veuillez entrer la description du produit"]
//   },

//   famille: {
//     type: String,
//     required: [true, "Veuillez spécifier la famille"],
//     enum: [
//       'Bois_Blanc',
//       'Bois_Rouge',
//       'Bois_Dur',
//       'Bois_Mdf'
//     ]
//   },

  
//   categorie: {
//     type: String,
//     required: [true, "Veuillez spécifier la categorie"],
//     enum: [
//       'Normal',
//       'Premium',
     
//     ]
//   },
//   type: {
//     type: String,
//     required: [false, "Veuillez spécifier le type"],
//     enum: [
//              'Hêtre','Frême','Acajou_Sapolli','Chêne','Brutte','Mélaminé','Couvre_Chant','Hydrofuge','Russe','StoraEnso','Ilim','Romanie','Finlandais','Suédois','Basse','Doméstique'
//     ]
//   },
//   Soustype: {
//     type: String,
//     required: [false, "Veuillez spécifier le type"],
//     enum: [
//              'Vida','Saters','Moelven','Rundvirke','StoraEnso','Kuhmo','Taiga','Arkhangelsk','Vogue_bois','Calvi','Delta_Bois','Sangiorgi_Italie','Shared_Wood'
//     ]
//   },

//   Choix: {
//     type: String,
//     required: [false, "Veuillez spécifier le type"],
//     enum: [
//              '1ere','2eme','3eme','6.5','Schalbord','Semi_avivé','Plots','Avivé','Avivé_étuvé choix A','Plots_étuvé choix A','Plots_étuvé choix BC','Avivé_étuvé choix B',
//              'Avivé_étuvé choix AB','Semi_avivé','Plots','Avivé','Choix QB1A'
//     ]
//   },
//   files: [{
//     public_id: String,
//     url: String
//   }]
// });

// module.exports = mongoose.model('Product', productSchema);