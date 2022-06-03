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
                len: { args: [2, 25], msg: "Le prénom doit etre compris entre 2 et 25 caractères." },
                is: {args: /^[a-zA-Zé èà]*$/, msg: "le prenom ne doit contenir que des lettres"}
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le nom ne doit pas être vide." },
                len: { args: [2, 25], msg: "Le nom doit etre compris entre 2 et 25 caractères." },
                is: {args: /^[a-zA-Zé èà]*$/, msg: "le nom ne doit contenir que des lettres"}
            }
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le mobile ne doit pas être vide." },
                is : {args : /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, msg: "Le format de mobile n'est pas valide."}
            }
        },
        fixe: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le mobile ne doit pas être vide." },
                is : {args : /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, msg: "Le format de fixe n'est pas valide."}
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
                notEmpty: { msg: "L'adresse ne doit pas etre vide." },
                is: {args: /^[a-zA-Zé èà0-9\s,.'-]{3,}$/, msg: "l'adresse n'est pas valide"}
            }
        },
        addressComp: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le complément d'adresse ne doit pas etre vide." },
                is: {args: /^[a-zA-Zé èà0-9\s,.'-]{3,}$/, msg: "le complément d'adresse n'est pas valide"}
            }
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le code postal ne doit pas etre vide." },
                is: {args: /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/, msg: "Le code postal n'est pas valide."}
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "La ville ne doit pas etre vide." },
                len: { args: [2, 30], msg: "La ville doit etre comprise entre 2 et 30 caractères."  },
                is: {args: /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/, msg: "La ville n'est pas dans un format valide"}
            }
        },
        deliveryAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "L'adresse de livraison ne doit pas etre vide." },
                is: {args: /^[a-zA-Zé èà0-9\s,.'-]{3,}$/, msg: "l'adresse de livraison n'est pas valide"}
            }
        },
        deliveryAddressComp: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le complément d'adresse de livraison ne doit pas etre vide." },
                is: {args: /^[a-zA-Zé èà0-9\s,.'-]{3,}$/, msg: "le complement d'adresse de livraison n'est pas valide"}
            }
        },
        deliveryZip: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le code postal de livraison ne doit pas etre vide." },
                is: {args: /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/, msg: "Le code postal de livraison n'est pas valide."}
            }
        },
        deliveryCity: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "La ville de livraison ne doit pas etre vide." },
                len: { args: [2, 30], msg: "La ville de livraison doit etre comprise entre 2 et 30 caractères."  },
                is: {args: /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/, msg: "La ville de livraison n'est pas dans un format valide"}
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
                is: {args: /^[a-zA-Zé èà0-9\s,.'-]{3,}$/, msg: "La société n'a pas un format valide"}
            }
        },
        fax: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le mobile ne doit pas être vide." },
                is : {args : /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, msg: "Le format de fax n'est pas valide."}
            }
        },
        tva: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: { msg: "Le numero de tva ne doit pas être vide." },
                len:{ args: [11, 13], msg: "Le numero de tva est composé d' une clé suivi du siret." },
                is:{args: /^(FR){0,1}[0-9A-Z]{2}\ [0-9]{9}$/, msg: "Le numero de TVA n'est pas dans un format valide"}
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
                is: {args: /^[0-9]{9}$/, msg:"Le SIRET doit etre composé de 9 chiffres."}
            }
        }
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated'
    })
}