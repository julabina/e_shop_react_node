module.exports = (sequelize, DataTypes) => {
    return sequelize.define('', {
        id: {
            
        },
        name: {

        },
        type: {

        },
        pictures: {

        },
        diameter: {

        },
        focal: {

        },
        FD: {

        },
        mount: {

        },
        price: {

        },
        stock: {

        },
        note: {

        },
        description: {
            
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}