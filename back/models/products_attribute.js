module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Product_attribute', {
        attribute_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        typeMount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        typeTelescope: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        brand: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        goTo: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        model: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        focal: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        coulant: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fov: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        eyeRelief: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        diameter: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fd: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        mount: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: false    
    })
}