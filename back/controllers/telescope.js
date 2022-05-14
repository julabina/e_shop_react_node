const { Telescope } = require('../db/sequelize');

exports.getAllTelescopes = (req, res, next) => {
    Telescope.findAll()
        .then(telescopes => {
            const message = 'La liste des télescopes a bien été récupérée.';
            res.status(200).json({ message, data: telescopes })
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneTelescope = (req, res, next) => {
    Telescope.findByPk(req.params.id)
        .then(telescope => {
            if (telescope !== null) {
                const message = 'Un télescope a bien été trouvé.';
                res.status(200).json({ message, data: telescope });
            } else {
                const message = 'Aucun télescope ne correspond à l\'id';
                res.status(404).json({ message });
            }
        })
        .catch(error => res.status(500).json({ error }));
}