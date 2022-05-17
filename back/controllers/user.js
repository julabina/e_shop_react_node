const bcrypt = require('bcrypt');
const { User } = require('../db/sequelize');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
            const user = new User ({
                userId: v4(),
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => {
                    const message = 'Utilisateur créé.';
                    res.status(201).json({ message })
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ where : { email: req.body.email } })
        .then(user => {
            if (user === null) {
                const message = 'Aucun utilisateur trouvé.';
                return res.status(404).json({ message });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        const message = 'Mot de passe incorrect.';
                        return res.status(401).json({ message });
                    }
                    res.status(200).json({
                        userId: user.userId,
                        token : jwt.sign( 
                            {userId: user.userId},
                            '' + process.env.REACT_APP_JWT_PRIVATE_KEY + '',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.findOneUser = (req, res, next) => {
    User.findOne({ where: { userId : req.body.userId }})
    .then(user => {
            if(user !== null) {
                const message = 'Un utilisateur a bien été trouvé.';
                res.status(200).json({ message, data: user })
            } else {
                const message = 'Aucun utilisateur trouvé.';
                res.status(404).json({ error });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.modify = (req, res, next) => {

};