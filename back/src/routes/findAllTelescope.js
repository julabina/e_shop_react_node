const { Telescope } = require('../db/sequelize');
const telescope = require('../models/telescope');

module.exports = (app) => {
    app.get('/api/telescopes', (req, res) => {  
        Telescope.findAll()
        .then(telescope => {
            const message = 'La liste des téléscopes a bien été récupérée.'
            res.json({message, data: telescope})
        })
    })
}