module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "commentaire", {
            
            commentaire: {
                type: Sequelize.DataTypes.STRING(255),

            },
            compteur: {
                type: Sequelize.DataTypes.INTEGER(1),
                allowNull: true
            },
        },
    );
};