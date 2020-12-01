module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "Faire", {
           status:{
            type: Sequelize.DataTypes.BOOLEAN,
                allowNull: true
           }
        },
    );
};