module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "quest", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            
            nom: {
                type: Sequelize.DataTypes.STRING(30),
                allowNull: true
            },
            objectif: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            },
            catégorie: {
                type: Sequelize.DataTypes.STRING(30),

            },
            price:{
                type:Sequelize.DataTypes.INTEGER(3)
            },
            verif:{
                type:Sequelize.DataTypes.BOOLEAN,
            }

        }, {
            timestamps: true,
            underscored: true
        }
    );
};