module.exports = (sequelize, DataTypes) => {
    return sequelize.define('TelescopeType', {
        telescopeType_id : {
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