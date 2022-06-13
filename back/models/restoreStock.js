module.exports = (sequelize, DataTypes) => {
    return sequelize.define('RestoreStock', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        }
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated'
    })
}