module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "newsletter", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            
            email: {
                type: Sequelize.DataTypes.STRING(150),
                allowNull: true
            }
        },{
            timestamps: true,
            underscored: true
        }
    );
};