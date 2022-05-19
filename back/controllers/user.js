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
            console.log('test');
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

exports.modifyProfilInfos = (req, res, next) => {
    User.update(req.body, { where: { userId : req.params.id }})
        .then(() => {
            return User.findOne({ where: { userId : req.params.id }})
                .then(user => {
                if(user !== null) {
                    const message = 'Utilisateur bien modifié.';
                    res.status(200).json({ message })
                } else {
                    const message = 'Aucun utilisateur trouvé.';
                    res.status(404).json({ error });
                }
            })
        })
        .catch(error => res.status(500).json({ error }));
    };
    
    exports.modifyPassword = (req, res, next) => {
        let password = undefined;
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                password = {password :hash};
                console.log(password);
                
                User.update(password, { where: { userId : req.params.id }})
                    .then(() => {
                        return User.findOne({ where: { userId : req.params.id }})
                        .then(user => {
                                if(user !== null) {
                                    const message = 'Mot de passe bien modifié.';
                                    res.status(200).json({ message })
                                } else {
                                    const message = 'Aucun utilisateur trouvé.';
                                    res.status(404).json({ error });
                                }
                            })
                        })
                        .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));      
        };
        
        exports.modifyEmail = (req, res, next) => {
            User.update(req.body, { where: { userId : req.params.id }})
                .then(() => {
                    return User.findOne({ where: { userId : req.params.id }})
                    .then(user => {
                            if(user !== null) {
                                const message = 'Adresse email bien modifié.';
                                res.status(200).json({ message })
                            } else {
                                const message = 'Aucun utilisateur trouvé.';
                                res.status(404).json({ error });
                            }
                        })
                    })
                    .catch(error => res.status(500).json({ error }));      
    };