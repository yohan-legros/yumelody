module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "eula", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            
            titre: {
                type: Sequelize.DataTypes.STRING(30),
                allowNull: true
            },
            pdf: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            },
            status: {
                type: Sequelize.DataTypes.BOOLEAN,
            },
            
        }, {
            timestamps: true,
            underscored: true
        }
    );
};