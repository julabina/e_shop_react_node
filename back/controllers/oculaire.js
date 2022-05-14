const{ Oculaire } = require('../db/sequelize');

exports.findAllOculaires = (req, res, next) => {
    Oculaire.findAll()
        .then(oculaires => {
            const message = 'La liste d\'oculaires a bien été récupérée';
            res.status(200).json({ message, data: oculaires });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.findOneOculaire = (req, res, next) => {
    Oculaire.findByPk(req.params.id)
        .then(oculaire => {
            if (oculaire !== null) {
                const message = 'Un oculaire a bien été trouvée.';
                res.status(200).json({ message, data: oculaire })
            } else {
                const message = 'Aucun oculaire ne correspond à l\'id.';
                res.status(404).json({ message })
            }
        })
        .catch(error => res.status(500).json({ error }));
};