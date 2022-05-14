module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        civ: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mobile: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fixe: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        newsletter: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        pub: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        addressComp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        deliveryAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        deliveryAddressComp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        deliveryZip: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        deliveryCity: {
            type: DataTypes.STRING,
            allowNull: true
        },
        company: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fax: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tva: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        siret: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}