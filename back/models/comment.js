module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comment', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: {
                msg: "Le productId est deja utilisé."
            }
        },        
        productCat: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                is: {args:/^[a-zA-Zé èà,\b<br />\b.'-€:!?]*$/, msg: 'Le commentaire ne doit comporter que des lettres'},
                notEmpty: {msg: "Le commentaire ne doit pas etre vide"}
            }
        }
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated'
    })
};