module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "licence", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            pdf: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};