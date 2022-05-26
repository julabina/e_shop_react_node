module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Category', {
        category_id: {
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
        updataAt: false
    })
}