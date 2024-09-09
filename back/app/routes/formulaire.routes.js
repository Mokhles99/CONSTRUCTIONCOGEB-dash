const router = require('express').Router();
const formController = require('../controllers/formulaire.controller'); 

router.post('/new', formController.ajouterFormulaire);
router.get('/forms', formController.listerFormulaire);

router.get('/formulaires/:idformulaire', formController.consulterFormulaire);
router.put('/forms/:idformulaire', formController.modifierFormulaire);
router.delete('/forms/:id', formController.supprimerFormulaire);

module.exports = router;