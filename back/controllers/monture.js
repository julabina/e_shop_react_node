const { Monture } = require('../db/sequelize');

exports.findAllMontures = (req, res, next) => {
    Monture.findAll()
        .then(montures => {
            const message = 'La liste des montures a bien été récupérée.';
            res.status(200).json({ message, data: montures })
        })
        .catch(error => res.status(500).json({ error }));
};

exports.findOneMonture = (req, res, next) => {
    Monture.findByPk(req.params.id)
        .then(monture => {
            if (monture !== null) {
                const message = 'Une monture a bien été trouvée.';
                res.status(200).json({ message, data: monture });
            } else {
                const message = 'Aucune monture ne correspond à l\'id.';
                res.status(404).json({ message });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

