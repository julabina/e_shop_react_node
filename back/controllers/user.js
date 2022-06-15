const bcrypt = require('bcrypt');
const { User, RestoreStock } = require('../db/sequelize');
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

   /*  RestoreStock.findOne({
        id: 1
    })
        .then(rest => {
            const currentDate = new Date()
            const updatedDate = Date.parse(rest.updated)
            const time = Date.parse(currentDate) - updatedDate
            if(time > 200000000) {

            }
        })  */ 

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
    if(req.body.created) {
        req.body.created = null
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
            let email = {email: req.body.new};
            
            User.findOne({where: {userId: req.params.id}}) 
                .then(user => {
                    if(user !== null) {
                        if(user.email === req.body.email) {
                            return User.update(email, { where: { userId : req.params.id }})
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
                        } else {
                            const message = "L'email ne correspond pas.";
                            return res.status(401).json({ message });
                        }
                    } else {
                        const message = 'Aucun utilisateur trouvé.';
                        return res.status(404).json({ message });
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

            /* User.update(email, { where: { userId : req.params.id }})
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
                    });  */     
    };

    exports.findName = (req, res, next) => {
        User.findOne({
            where: {
                userId: req.params.id
            },
            attributes: ['firstName', 'lastName', 'email', 'mobile'],
            raw: true
        })
            .then(infos => {
                if (infos !== null) {
                    const message = "Les infos ont bien été récupéré.";
                    return res.status(200).json({ message, data: infos })
                }
                const message = "Aucun utilisateur trouvé.";
                res.status(404).json({ message })
            })
            .catch(error => res.status(500).json({ error }))
    };

    exports.deleteAccount = (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token,'' + process.env.REACT_APP_JWT_PRIVATE_KEY + '');
        const idUser = decodeToken.userId;

        let userToDelete = null

        if(req.params.id === idUser) {
            userToDelete = req.params.id
        }
        
        User.findOne({
            where: {
                userId: userToDelete
            }
        })
            .then(user => {
                let characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                let letters  = 'abcdefghijklmnopqrstuvwxyz';
                
                let start = "", body = "", end = ""
                
                let startLength = Math.ceil(Math.random() * 100);
                let bodyLength = Math.ceil(Math.random() * 100);
                let endLength = Math.ceil(Math.random() * 3) + 1;
                
                let charactersLength = characters.length;
                let lettersLength = letters.length
                
                for(let i = 0; i < startLength; i++) {
                    start += characters.charAt(Math.floor(Math.random() * 
                 charactersLength));
                }
                for(let i = 0; i < bodyLength; i++) {
                    body += characters.charAt(Math.floor(Math.random() * 
                   charactersLength));
                }
                for(let i = 0; i < endLength; i++) {
                    end += letters.charAt(Math.floor(Math.random() * 
                 lettersLength));
                }    

                let newMail = start + "@" + body + "." + end

                let newUser = {
                    email: newMail,
                    password: v4(),
                    firstName: null,
                    lastName: null,
                    mobile: null,
                    fixe: null,
                    newsletter: false,
                    pub: false,
                    address: null,
                    addressComp: null,
                    zip: null,
                    city: null,
                    deleveryAddress: null,
                    deliveryAddressComp: null,
                    deliveryZip: null,
                    deliveryCity: null,
                    company: null,
                    companyName: null,
                    fax: null,
                    tva: null,
                    siret: null
                }
                
                return User.update( newUser, {
                     where : {
                         userId : userToDelete
                     }
                 })
                 .then(() => {
                    return User.findOne({ where: { userId : userToDelete }})
                    .then(user => {
                            if(user !== null) {
                                const message = 'Utilisateur bien supprimé.';
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
                    
            })
            .catch(error => res.status(500).json({ error }));


    };