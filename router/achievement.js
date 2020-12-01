
const express = require("express");
const { achievement, user } = require("../database/db");
const db = require("../database/db");
const router = express.Router();


router.post("/create",(req,res)=>{
    db.user.findOne({
        where:{email:req.body.email}
    })
    .then((user)=>{
        if(user){
            db.achievement.create(req.body)
            .then((achievement)=>{
             
                res.status(200).json({
                    message:'achievement creer avec succés',
                    achievement:iteamachievement.nom
                })
            })
            
        }
        else{
            res.json({
                message:"l'achievement existe déja ",
                achievement:achievement.nom
            })
        }
    })
})



router.post("/add",(req,res)=>{
    db.user.findOne({
        where:{ email: req.body.email}
    })
    .then(user => {
        if(user){
            db.achievement.findOne({
                where:{titre:req.body.titre}
            })
            .then((achievement)=>{
                if(achievement){
                    res.status(200).json({
                        message:"vous avez déja acquerie cette achievement",
                        name:achievement.nom
                    })
                }
                else if(!achievement){
                    db.achievement.create(req.body)
                    .then((itemachievement)=>{
                        console.log(itemachievement)
                        if(user.compteur>=itemachievement.condition){
                            const ward = parseInt(itemachievement.reward);
                            const point = parseInt(user.artpoint);
                            const reward = ward + point;
                            itemachievement.update({
                                userId: user.id,
                            })
                            user.update({
                                artpoint: reward
                            })
                            .then((itemachievement)=>{
                                res.status(200).json({
                                    message:'achievement ajouter avec succés',
                                    nom:itemachievement.titre
                                })
                            })
                            .catch(err => {
                                res.json(err);
                            })
                        }
                        else{
                            itemachievement.destroy()
                            .then(()=>{
                                res.status(412).json({
                                    message:"vous ne remplisser pas les condition neccesaire"
                                })
                            })
                            .catch(err => {
                                res.json(err);
                            })
                        }
            
                    })
                }
                else{
                    res.status(500).json({
                        message:"error",
                        achievement:iteamachievement.titre
                    })
                }
            })
            .catch(err => {
                res.status(502).json(err);
            })
        }
        else{
            res.json({
                message:"bad request"
            })
        }
    })
    .catch(err => {
        res.status(502).json(err);
    })
})            


router.get('/all',(req,res)=>{
    db.user.findOne({
        where:{email:req.body.email}
    })
    .then((user)=>{
        if(user){
            db.achievement.findAll({
                where:{
                    userId:user.id
                }
            })
            .then((achievement)=>{
                if(!achievement){
                    res.status(404).json("vous n'avez encore acquerie d'achievement courage!!!")
                }
                else{
                    res.status(200).json({
                        achievements:achievement
                    })
                }
            })
            .catch(err => {
                res.json(err);
            })
        }
        else{
            res.status(404).json({
                message:"veuillez vous connecter pour acceder a ces information"
            })
        }
    })
    .catch(err => {
        res.json(err);
    })
    
})
module.exports=router;
