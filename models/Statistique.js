module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "statistique", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            
            like: {
                type: Sequelize.DataTypes.INTEGER(3),
                allowNull: true
            },
            views: {
                type: Sequelize.DataTypes.INTEGER(3),
                allowNull: true
            },
            commentaire: {
                type: Sequelize.DataTypes.STRING(255),

            },
            commentaire: {
                type: Sequelize.DataTypes.STRING(255),

            },
            note: {
                type: Sequelize.DataTypes.INTEGER(2),
            },
            compteur: {
                type: Sequelize.DataTypes.INTEGER(1),
                allowNull: true
            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};