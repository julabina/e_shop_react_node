module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Telescope', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom est deja pris.'
            }
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
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
        diameter: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        focal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fd: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        mount: {
            type: DataTypes.STRING,
            allowNull: true
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
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}