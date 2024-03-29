module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "achievement", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            
            titre: {
                type: Sequelize.DataTypes.STRING(100),
                allowNull: false
            },
            description: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            },
            condition: {
                type: Sequelize.DataTypes.INTEGER(3),

            },
            reward:{
                type: Sequelize.DataTypes.INTEGER(4),
            },
            Status:{
                type: Sequelize.DataTypes.BOOLEAN,
            }
        }, {
            timestamps: true,
            underscored: true
        }
    );
};