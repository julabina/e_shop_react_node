module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            validate: {
                notNull: { msg: "L'id ne peut pas etre modifier." }
            }
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: { msg: "L'userId ne doit pas être vide." },
                notNull: {msg: "L'userId est une propriété requise."},
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Un compte est deja lié à cet email."
            },
            validate: {
                notEmpty: { msg: "L'email ne doit pas être vide." },
                notNull: {msg: "L'email est une propriété requise."},
                isEmail: {msg: "Format d'email non valide."}
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le mot de passe ne doit pas être vide." },
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le prénom ne doit pas être vide." },
                len: { args: [2, 25], msg: "Le prénom doit re compris entre 2 et 25 caractères." }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le nom ne doit pas être vide." },
                len: { args: [2, 25], msg: "Le nom doit re compris entre 2 et 25 caractères." }
            }
        },
        mobile: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le mobile ne doit pas être vide." },
                isInt: { msg: "Le mobile ne doit contenir uniquement des chiffres." }
            }
        },
        fixe: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le mobile ne doit pas être vide." },
                isInt: { msg: "Le fixe ne doit contenir uniquement des chiffres." }
            }
        },
        newsletter: {
            type: DataTypes.BOOLEAN,
            allowNull: true         
        },
        pub: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "L'adresse ne doit pas etre vide." }
            }
        },
        addressComp: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le complément d'adresse ne doit pas etre vide." }
            }
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le code postal ne doit pas etre vide." },
                isInt: { msg: "Le code postal doit uniquement contenir que des chiffres." }
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "La ville ne doit pas etre vide." },
                len: { args: [2, 30], msg: "La ville doit etre comprise entre 2 et 30 caractères."  }
            }
        },
        deliveryAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "L'adresse de livraison ne doit pas etre vide." }
            }
        },
        deliveryAddressComp: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le complément d'adresse de livraison ne doit pas etre vide." }
            }
        },
        deliveryZip: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le code postal de livraison ne doit pas etre vide." },
                isInt: { msg: "Le code postal de livraison doit uniquement contenir que des chiffres." },
                isLengthIsFive(value) {
                    if(value !== null && value !== undefined) {
                        if (parseInt(value).length !== 5) {
                            throw new Error('Le code postal de livraison doit avoir une longueur de 5.')
                        }
                    }
                }
            }
        },
        deliveryCity: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "La ville de livraison ne doit pas etre vide." },
                len: { args: [2, 30], msg: "La ville de livraison doit etre comprise entre 2 et 30 caractères."  }
            }
        },
        company: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le nom de la société ne doit pas etre vide." },
            }
        },
        fax: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le mobile ne doit pas être vide." },
                isInt: { msg: "Le fixe ne doit contenir uniquement des chiffres." }
            }
        },
        tva: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le numero de tva ne doit pas être vide." },
                len:{ args: [11, 13], msg: "Le numero de tva est composé d' une clé suivi du siret." }
            }
        },
        siret: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: {
                msg: "Numero de SIRET deja lié à un autre compte.",
            },
            validate: {
                notEmpty: { msg: "Le SIRET ne doit pas être vide." },
                isInt: { msg: "Le SIRET ne doit contenir que des chiffres." },
                isLengthIsNine(value) {
                    if(value !== null && value !== undefined) {
                        if(parseInt(value).length !== 9) {
                            throw new Error('Le SIRET doit etre composé de 9 chiffres.')
                        }
                    }
                }
            }
        }
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}