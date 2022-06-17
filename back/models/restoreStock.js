module.exports = (sequelize, DataTypes) => {
    return sequelize.define('RestoreStock', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE, 
            allowNull: true
        }
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated'
    })
};