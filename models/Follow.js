module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "follow", {
            
            follow: {
                type: Sequelize.DataTypes.STRING(100),
                allowNull: true
            },
            compteur: {
                type: Sequelize.DataTypes.INTEGER(1),
                allowNull: true
            },
        },
    );
};