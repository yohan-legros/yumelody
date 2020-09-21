module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "abonnement", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            
            nom: {
                type: Sequelize.DataTypes.STRING(30),
                allowNull: true
            },
            description: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            },
            price: {
                type: Sequelize.DataTypes.INTEGER(2),

            },
            status:{
                type: Sequelize.DataTypes.BOOLEAN,
            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};