const Sequelize = require("sequelize");

const db = {};

const dbinfo = new Sequelize("yume", "root", "",{
    host: "localhost",
    dialect: "mysql",
    port: "3306",
    pool:{
        max: 5,
        min: 0,
    }
});

dbinfo.authenticate()
.then(() =>{
    console.log("Connexion à la base de données réussie !")
})
.catch((err) => {
console.error("Unable to connect to the database:", err);
});

db.abonnement = require("../models/Abonnement")(dbinfo,Sequelize);
db.achievement = require("../models/Achievement")(dbinfo,Sequelize);
db.advantage = require("../models/Advantage")(dbinfo,Sequelize);
db.challenge = require("../models/Challenge")(dbinfo,Sequelize);
db.eula = require("../models/EULA")(dbinfo,Sequelize);
db.image = require("../models/Image")(dbinfo,Sequelize);
db.job = require("../models/Job")(dbinfo,Sequelize);
db.oeuvre = require("../models/Oeuvre")(dbinfo,Sequelize);
db.quest = require("../models/Quest")(dbinfo,Sequelize);
db.statistique = require("../models/Statistique")(dbinfo,Sequelize);
db.user = require("../models/User")(dbinfo,Sequelize);


db.oeuvre.belongsToMany(db.user,{ through: "Statistique",foreignKey:"oeuvreId"});
db.user.belongsToMany(db.oeuvre,{ through: "Statistique", foreignKey:"userId"});

db.user.belongsToMany(db.quest,{ through: "faire", foreignKey:"userId"});
db.quest.belongsToMany(db.user,{ through: "faire", foreignKey:"questId"});


db.user.hasMany(db.advantage,{foreignKey:"userId"});
db.user.hasMany(db.eula,{foreignKey:"userId"});
db.user.hasMany(db.quest,{foreignKey:"userId"});
db.user.hasMany(db.achievement,{foreignKey:"userId"});









db.dbinfo = dbinfo;
db.Sequelize = Sequelize;

dbinfo.sync({force: true});

module.exports = db;
