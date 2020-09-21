module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "user", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {  
            type: Sequelize.DataTypes.STRING(45),
            allowNull: true
            },

            prenom: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: true
            },
            username: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: true
            },
            tel: {
                type: Sequelize.DataTypes.INTEGER(10),
                allowNull: true
            },

            pays: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: true
            },
            ville: {
                type: Sequelize.DataTypes.STRING(100),
                allowNull: true
            },

            email: {
                type: Sequelize.DataTypes.STRING(255),
                unique: true,
                allowNull: false
            },

            password: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false
            },
            status: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: true
            },
            forget: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: true
            },
            
            image: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            },
            society: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: true
            },
            artpoint: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true
            },           
        },
        {
            timestamps: true,
            underscored: true
        }
    )
}