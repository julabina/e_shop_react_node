module.exports = (sequelize, DataTypes) => {
    return sequelize.define('MountType', {
        mountType_id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: true,
        createAt: 'created',
        updateAt: false
    })
}