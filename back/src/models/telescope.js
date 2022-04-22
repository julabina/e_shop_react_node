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
        FD: {
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
        note: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
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