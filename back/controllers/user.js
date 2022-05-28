const bcrypt = require('bcrypt');
const { User } = require('../db/sequelize');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
const { ValidationError, UniqueConstraintError } = require('sequelize');

exports.signup = (req, res, next) => {
    if(req.body.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
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
                    .catch(error => {
                        if (error instanceof ValidationError) {
                            return res.status(400).json({message: error.message, data: error}); 
                        }
                        if (error instanceof UniqueConstraintError) {
                            return res.status(400).json({message: error.message, data: error});
                        }
                        res.status(500).json({ error })
                    });
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error}); 
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                const message = 'L\'utilisateur n\'a pas pu être créé, réessayez dans quelques instant.';
                res.status(500).json({ message, data: error })
            });
    } else {
        const message = "Le mot de passe doit contenir minimiun 1 lettre, 1 majuscule et 1 chiffre et etre composé de minimun 8 caratères."
        res.status(400).json({ message })
    }
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
                res.status(404).json({ message });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.modifyProfilInfos = (req, res, next) => {
    if(req.body.password) {
        req.body.password = null;
    }
    if(req.body.email) {
        req.body.email = null;
    }
    if(req.body.userId) {
        req.body.userId = null;
    }
    if(req.body.id) {
        req.body.id = null;
    }

    User.update(req.body, { where: { userId : req.params.id }})
        .then(() => {
            return User.findOne({ where: { userId : req.params.id }})
                .then(user => {
                if(user !== null) {
                    const message = 'Utilisateur bien modifié.';
                    res.status(200).json({ message })
                } else {
                    const message = 'Aucun utilisateur trouvé.';
                    res.status(404).json({ message });
                }
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error});
                }
                res.status(500).json({ message: "Un problème est survenu.", data: error })
            });
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({message: error.message, data: error});
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({message: error.message, data: error});
            }
            const message = 'L\'utilisateur n\'a pas pu être modifié, réessayez dans quelques instant.';
            res.status(500).json({ message, data: error })
        });
    };
    
exports.modifyPassword = (req, res, next) => {
        if(req.body.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
            let password = undefined;
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    password = {password :hash};
                    
                    User.update(password, { where: { userId : req.params.id }})
                        .then(() => {
                            return User.findOne({ where: { userId : req.params.id }})
                            .then(user => {
                                    if(user !== null) {
                                        const message = 'Mot de passe bien modifié.';
                                        res.status(200).json({ message })
                                    } else {
                                        const message = 'Aucun utilisateur trouvé.';
                                        res.status(404).json({ message });
                                    }
                                })
                            })
                            .catch(error => {
                                if (error instanceof ValidationError) {
                                    return res.status(400).json({message: error.message, data: error});
                                }
                                if (error instanceof UniqueConstraintError) {
                                    return res.status(400).json({message: error.message, data: error});
                                }
                                res.status(500).json({ message: "Une erreur est survenu.", data: error })
                            });
                })
                .catch(error => res.status(500).json({ error }));  
        } else {
            const message = "Le mot de passe doit contenir minimiun 1 lettre, 1 majuscule et 1 chiffre et etre composé de minimun 8 caratères."
            res.status(400).json({ message })
        }    
        };
        
        exports.modifyEmail = (req, res, next) => {
            let email = {email: req.body.email};
            console.log(email);
            User.update(email, { where: { userId : req.params.id }})
                .then(() => {
                    return User.findOne({ where: { userId : req.params.id }})
                    .then(user => {
                            if(user !== null) {
                                const message = 'Adresse email bien modifié.';
                                res.status(200).json({ message })
                            } else {
                                const message = 'Aucun utilisateur trouvé.';
                                res.status(404).json({ message });
                            }
                        })
                        .catch(error => {
                            if (error instanceof ValidationError) {
                                return res.status(400).json({message: error.message, data: error});
                            }
                            if (error instanceof UniqueConstraintError) {
                                return res.status(400).json({message: error.message, data: error});
                            }
                            res.status(500).json({ message: "Une erreur est survenu.", data: error })
                        });      
                    })
                    .catch(error => {
                        if (error instanceof ValidationError) {
                            return res.status(400).json({message: error.message, data: error});
                        }
                        if (error instanceof UniqueConstraintError) {
                            return res.status(400).json({message: error.message, data: error});
                        }
                        res.status(500).json({ message: "Une erreur est survenu.", data: error })
                    });      
    };