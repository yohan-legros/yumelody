module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "job", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            //nom de la société 
            société: {
                type: Sequelize.DataTypes.STRING(100),
                allowNull: false
            },
            image: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: true
            },
            //titre du job request
            titre: {
                type: Sequelize.DataTypes.STRING(100),
                allowNull: false
            },
            //location du lieux de travaille
            location: {
                type: Sequelize.DataTypes.STRING(150),
                allowNull: false
            },
            //poste pour lequel on postule
            poste: {
                type: Sequelize.DataTypes.STRING(50),
                allowNull:false
            },
            //descritpion du travaille
            description: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull:true
            },
            //compétence nécessaire
            compétence: {
                type: Sequelize.DataTypes.STRING(100),
                allowNull:true
            },
            //link pour postuler
            postuler: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull:true
            },
            //condition a remplire pour postuler
            condition: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull:true
            },
            //connaitre un peu mieux lemployeur
            about: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull:true
            },

        }, {
            timestamps: true,
            underscored: true
        }
    );
};