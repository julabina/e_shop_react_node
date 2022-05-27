module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Product', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: {
                msg: "Le productId est deja utilisé."
            }
        },
        categoryId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock : {
            type: DataTypes.INTEGER,
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
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}