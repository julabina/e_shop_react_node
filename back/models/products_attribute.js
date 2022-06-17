module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Product_attribute', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mountTypeId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        telescopeTypeId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        brandId: {
            type: DataTypes.STRING,
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
        oculaireModelId: {
            type: DataTypes.STRING,
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
};