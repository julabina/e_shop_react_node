module.exports = (sequelize, DataTypes) => {
    return sequelize.define('OculaireModel', {
        ocualireModel_id : {
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