module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Category', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: {
                msg: "Le productId est deja utilisé."
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: true,
        createAt: 'created',
        updataAt: false
    })
}