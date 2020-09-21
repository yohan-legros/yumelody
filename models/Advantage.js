module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "advantage", {
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
            description: {
                type: Sequelize.DataTypes.INTEGER(4),
                allowNull: true
            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};