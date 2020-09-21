//Permet de créer la db, le CRUD, nos tables, les relations...
const Sequelize = require("sequelize");

const db = {};

const dbinfo = new Sequelize("dbformation", "root", "",{
    host: "localhost",
    dialect: "mysql",
    port: "3308",
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

db.formation = require("../models/Formation")(dbinfo,Sequelize);
db.pdf = require("../models/Pdf")(dbinfo,Sequelize);
db.image = require("../models/Image")(dbinfo,Sequelize);
db.video = require("../models/Video")(dbinfo,Sequelize);
db.user = require("../models/User")(dbinfo,Sequelize);
db.candidat = require("../models/Candidat")(dbinfo,Sequelize);
db.postuler = require("../models/Postuler")(dbinfo,Sequelize);
db.suivi = require("../models/Suivi")(dbinfo,Sequelize);

db.formation.hasMany(db.image, {foreignKey: "formationId"});
db.formation.hasMany(db.pdf, {foreignKey: "formationId"});
db.formation.hasMany(db.video, {foreignKey: "formationId"});

db.formation.belongsToMany(db.candidat, { through: "Postuler", foreignKey: "formationId"});
db.candidat.belongsToMany(db.formation, { through: "Postuler", foreignKey: "candidatId"});

db.user.belongsToMany(db.formation, { through: "Suivi", foreignKey: "userId"});
db.formation.belongsToMany(db.user, { through: "Suivi", foreignKey: "formationId"});





db.dbinfo = dbinfo;
db.Sequelize = Sequelize;

//dbinfo.sync({force: true});

module.exports = db;

