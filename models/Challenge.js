module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "challenge", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            
            titre: {
                type: Sequelize.DataTypes.STRING(30),
                allowNull: true
            },
            objectif: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            //description des prix /du classement
            Prize: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            },
            reward: {
                type: Sequelize.DataTypes.INTEGER(2),
                allowNull:false
            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};