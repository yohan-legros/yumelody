module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "oeuvre", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING(50),
                allowNull: false
            },
            description: {
                type: Sequelize.DataTypes.STRING(100),
                allowNull: true
            },
            
            image: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            },
            music: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            },
            video: {
                type: Sequelize.DataTypes.STRING(255),

            },
            price: {
                type: Sequelize.DataTypes.INTEGER(3),
                allowNull:true

            },
            catégorie: {
                type: Sequelize.DataTypes.STRING(50),
                allowNull:true

            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};