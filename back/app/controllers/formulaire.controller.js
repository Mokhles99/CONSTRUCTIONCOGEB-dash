const FormulaireModel = require("../models/formulaire.model")




//func ajout
exports.ajouterFormulaire = async (req, res) => {
    const formulaireObj = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      number: req.body.number,
      notes: req.body.notes,
    };
  
    const formulaire = new FormulaireModel(formulaireObj);
  
    try {
      const createdFormulaire = await formulaire.save();
      res.status(200).json({ createdFormulaire });
    } catch (error) {
      res.status(400).json({ error });
    }
  };

//func modif

exports.modifierFormulaire = async (req, res) => {
    const id = req.params.idformulaire;
    const modifiedObj = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        number: req.body.number,
        notes: req.body.notes,
    };

    try {
        const modifFormulaire = await FormulaireModel.findByIdAndUpdate(id, modifiedObj, { new: true });
        if (!modifFormulaire) {
            return res.status(404).json({ message: "Formulaire not found" });
        }
        res.status(200).json({ formulaire: modifFormulaire, message: "Formulaire modifié avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//supprimer

exports.supprimerFormulaire = async (req, res) => {
    const formulaireId = req.params.id; // Utiliser 'id' pour correspondre à la route

    try {
        const deletedFormulaire = await FormulaireModel.findByIdAndDelete(formulaireId);
        if (!deletedFormulaire) {
            return res.status(404).json({ message: "Formulaire not found" });
        }
        res.status(200).json({ message: "Formulaire deleted" });
    } catch (error) {
        res.status(400).json({ error });
    }
};
//lister

exports.listerFormulaire = async (req, res) => {
    try {
        const formulaireList = await FormulaireModel.find({});
        res.status(200).json({ formulaireList });
    } catch (error) {
        res.status(400).json({ error });
    }
};



exports.consulterFormulaire = async (req, res) => {
    const id = req.params.idformulaire;

    try {
        const formulaire = await FormulaireModel.findById(id);
        if (!formulaire) {
            return res.status(404).json({ message: "Formulaire not found" });
        }
        res.status(200).json({ formulaire });
    } catch (error) {
        res.status(400).json({ error });
    }
};
