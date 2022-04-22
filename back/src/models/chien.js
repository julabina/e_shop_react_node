module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Chien', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull : false,
            unique: {
                msg: 'Le nom est deja pris.'
            }
        },
        size: {
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
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, note: {
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
        timestamp: true,
        createdAt: 'created',
        updatedAt: false
    })
}