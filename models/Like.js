module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "like", {
            
            like: {
                type: Sequelize.DataTypes.INTEGER(3),
                allowNull: true
            },
            compteur: {
                type: Sequelize.DataTypes.INTEGER(1),
                allowNull: true
            },
        },
    );
};