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
db.user = require("../models/User")(dbinfo,Sequelize);
db.faire = require("../models/Faire")(dbinfo,Sequelize);
db.like = require("../models/Like")(dbinfo,Sequelize);
db.follow = require("../models/Follow")(dbinfo,Sequelize);
db.commentaire = require("../models/Commentaire")(dbinfo,Sequelize);
db.newsletter = require("../models/Newsletter")(dbinfo,Sequelize);




db.user.belongsToMany(db.quest,{ through: "Faire", foreignKey:"userId"});
db.quest.belongsToMany(db.user,{ through: "Faire", foreignKey:"questId"});



db.user.hasMany(db.advantage,{foreignKey:"userId"});
db.user.hasMany(db.eula,{foreignKey:"userId"});
db.user.hasMany(db.oeuvre,{foreignKey:"userId"});
db.user.hasMany(db.follow,{foreignKey:"userId"});
db.user.hasMany(db.achievement,{foreignKey:"userId"});
db.user.hasMany(db.job,{foreignKey:"userId"});


db.abonnement.hasMany(db.user,{foreignKey:"userId"});







db.oeuvre.hasMany(db.like,{foreignKey:"oeuvreId"});
db.oeuvre.hasMany(db.commentaire,{foreignKey:"oeuvreId"});
db.oeuvre.hasMany(db.image,{foreignKey:"oeuvreId"});








db.dbinfo = dbinfo;
db.Sequelize = Sequelize;

//dbinfo.sync({force: true});

module.exports = db;
