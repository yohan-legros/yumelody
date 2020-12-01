
const express = require("express");
const db = require("../database/db");
const router = express.Router();

router.post('/add',(req,res)=>{
    db.user.findOne({
        where:{email:req.body.email}
    })
    .then((user)=>{
        if(user.society==true){
            db.job.create(req.body)
            .then((job)=>{
                job.update({
                    userId:user.id
                })
                res.status(200).json({
                    message:"votre job poste a été creer",
                    titre:job.titre
                })
            })
            .catch(err => {
                res.json(err);
            })
        }
        else{
            res.status(502).json({
                message:"vous navez pas acces a cette fonctionalité"
            })
        }
    })
})

router.get("/all",(req,res)=>{
    db.job.findAll({
        where:{société:req.body.société}
    })
    .then((job)=>{
        if(!job){
            res.status(404).json("cette société n'a pas encore poster de job request")
        }
        else{
            res.status(200).json({
                jobs:job
            })
        }
    })
    .catch(err => {
        res.json(err);
    })
})

module.exports=router;