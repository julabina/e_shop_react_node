module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Comment', {
        
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}