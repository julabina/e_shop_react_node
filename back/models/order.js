module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}