module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Monture', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capacity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        goTo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        pictures: {
            type: DataTypes.TEXT,
            allowNull: false,
            get() {
                return this.getDataValue('pictures').split(',')
            },
            set(pictures) { 
                return this.setDataValue('pictures', pictures.join())
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description1: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description2: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description3: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        descriptionPicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        promo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        promoValue: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }  , {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}