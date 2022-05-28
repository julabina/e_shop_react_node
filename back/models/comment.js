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
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}