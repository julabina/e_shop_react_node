module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Order', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: {
                msg: "Le numero de commande est deja utilisé."
            }
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        products: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        count: {
            type: DataTypes.STRING,
            allowNull: false
        },
        names: {
            type: DataTypes.STRING,
            allowNull: false
        },
        instruction: {
            type: DataTypes.STRING, 
            allowNull: true
        },
        deliveryInformation: {
            type: DataTypes.STRING, 
            allowNull: true
        }
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}