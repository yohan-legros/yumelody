module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "faire", {
           reset:{
            type:Sequelize.DataTypes.BOOLEAN,
           }
        }, {
            timestamps: true,
            underscored: true
        }
    );
};