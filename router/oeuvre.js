
const { response } = require("express");
const express = require("express");
const { Op } = require("sequelize");
const { oeuvre, user, like } = require("../database/db");
const db = require("../database/db");
const router = express.Router();

 router.post("/add",(req,res)=>{
    db.user.findOne({
        where:{ email: req.body.email}
    })
    .then(user => {
        if(user){
            db.oeuvre.create(req.body)
            .then(itemoeuvre => {
                itemoeuvre.update({
                    userId:user.id,
                })
                user.update({
                    compteur :user.compteur+1
                })
                  if(itemoeuvre.image==null && itemoeuvre.video==null && itemoeuvre.music==null ){
                    itemoeuvre.destroy()
                    res.status(500).json({
                        message:"pour poster une oeuvre il nous faut déja du contenue :)"
                    })
                }
                else if(itemoeuvre.image==null && itemoeuvre.video==null && itemoeuvre.music!=null){
                    db.like.create({
                        like: 0,
                        compteur:0,
                        oeuvreId: itemoeuvre.id
                    })
                    .then(() => {
                          db.commentaire.create({
                              commentaire: '',
                              compteur:0,
                              oeuvreId: itemoeuvre.id
                          })
                              .then(() => {
                                  db.oeuvre.findOne({
                                      where: {id: itemoeuvre.id},
                                      include:[{
                                          model: db.like
                                      },
                                      {
                                          model: db.commentaire
                                      },
                                  ]
                                  })
                                  .then(()=>{
                                    itemoeuvre.update({
                                        image: 'defaut'
                                    })
                                    .then(oeuvre => {
                                        res.status(200).json({oeuvre: oeuvre})
                                    })
                                    .catch(err => {
                                        res.status(502).json(err);
                                    })
                                  })
                                  
                              })
                              .catch(err => {
                                  res.status(502).json(err);
                              })
                    })
                    .catch(err => {
                      res.status(502).json(err);
                  })
                }
                else if((itemoeuvre.image!=null || itemoeuvre.video!=null ||itemoeuvre.music!=null) && !(itemoeuvre.image!=null && itemoeuvre.video!=null && itemoeuvre.music!=null) ){
                    db.like.create({
                        like: 0,
                        compteur:0,
                        oeuvreId: itemoeuvre.id
                    })
                    .then(() => {
                          db.commentaire.create({
                              commentaire: '',
                              compteur:0,
                              oeuvreId: itemoeuvre.id
                          })
                              .then(() => {
                                  db.oeuvre.findOne({
                                      where: {id: itemoeuvre.id},
                                      include:[{
                                          model: db.like
                                      },
                                      {
                                          model: db.commentaire
                                      },
                                  ]
                                  })
                                  .then(oeuvre => {
                                      res.status(200).json({oeuvre: oeuvre})
                                  })
                                  .catch(err => {
                                      res.status(502).json(err);
                                  })
                                  
                              })
                              .catch(err => {
                                  res.status(502).json(err);
                              })
                    })
                    .catch(err => {
                      res.status(502).json(err);
                  })
                }
                else{
                    itemoeuvre.destroy()
                    res.status(500).json({
                        message:"bad request"
                    })
                }
            })
            .catch(err => {
                res.status(502).json(err);
            })
        }
        else{
            res.json("vous navez pas acces a cette fonctionalité");
        }
    })
    .catch(err => {
        res.status(502).json(err);
    })
 })
 router.get("/all", (req, res) => {
    db.oeuvre
        .findAll({
            include: [{
                    model: db.like,
                },

                {
                    model: db.commentaire,
                },
            ],
        })
        .then((reponse) => {
            res.status(200).json({ oeuvres: reponse });
        })
        .catch((err) => {
            res.json(err);
        });
});

 router.get("/allu",(req, res)=>{
     db.user.findOne({
         where: {email:req.body.email},
     })
     .then(user => {
         console.log(user)
         db.oeuvre.findAll({
             where:{
                 userId:user.id
             },
             include:[
                {model:db.like},
                {model: db.commentaire},
              
            ]
         })
         .then((oeuvre)=>{
            if(oeuvre == []){
                res.status(404).json("pas d'oeuvres dans la base ")
            }
              else{
                res.status(200).json({oeuvres: oeuvre})
              }
        })
         })
       
    .catch(err => {
        res.status(400).json(err)
    })
 })

router.post("/remove",(req,res)=>{
    db.oeuvre.findOne({
        where: {id:req.body.id}
    })
    .then((oeuvre)=>{
        if(!oeuvre){
            res.status(500).json({
                message:"cette oeuvre a déja été détruite ou nexiste pas",
            })
        }
        else{
            res.status(200).json({
                message:"cette oeuvre a été détruite",
                oeuvre : oeuvre.nom
            })
            oeuvre.destroy()
        }
    })
    .catch(err => {
        res.status(400).json(err)
    })
})
 
router.get("/all/:limit", (req, res) => {
    db.oeuvre.findAll({
     
        include:[
           {model:db.like},
           {model: db.commentaire},
         
       ],
       limit: parseInt(req.params.limit),

    })
    .then((oeuvre)=>{
       if(oeuvre == []){
           res.status(404).json("pas d'oeuvres dans la base ")
       }
         else{
           res.status(200).json({oeuvres: oeuvre})
         }
   })
   .catch(err => {
    res.status(400).json(err)
})
})
router.get("/music/:limit", (req, res) => {
    db.oeuvre.findAll({
        where:{
            music:{
                [Op.not]: null, 
            }
        },
        limit: parseInt(req.params.limit),
    })
    .then((oeuvre)=>{
       if(oeuvre == []){
           res.status(404).json("pas d'oeuvres dans la base ")
       }
        else{
           res.status(200).json({oeuvres: oeuvre})
        }
   })
   .catch(err => {
    res.status(400).json(err)
})
})

router.get("/art/:limit", (req, res) => {
    db.oeuvre.findAll({
        where:{
            image:{
                [Op.not]: null, 
            }
        },
        limit: parseInt(req.params.limit),
       
    })
    .then((oeuvre)=>{
       if(oeuvre == []){
           res.status(404).json("pas d'oeuvres dans la base ")
       }
        else{
           res.status(200).json({oeuvres: oeuvre})
        }
   })
   .catch(err => {
    res.status(400).json(err)
    })
})
router.get("/oeuvre/:id", (req, res) => {
    db.oeuvre.findOne({
        where:{id:req.params.id},
       
    })
    .then((oeuvre)=>{
       if(oeuvre == []){
           res.status(404).json("pas d'oeuvres dans la base ")
       }
        else{
           res.status(200).json({oeuvres: oeuvre})
        }
   })
   .catch(err => {
    res.status(400).json(err)
    })
})





router.get("/video/:limit", (req, res) => {
    db.oeuvre.findAll({
        where:{
            video:{
                [Op.not]: null, 
            }
        },
        limit: parseInt(req.params.limit),
       
    })
    .then((oeuvre)=>{
       if(oeuvre.video == []){
           res.status(404).json("pas d'oeuvres concernant cette catégorie  dans la base ")
       }
        else{
           res.status(200).json({oeuvres: oeuvre})
        }
   })
   .catch(err => {
    res.status(400).json(err)
})
})

module.exports=router;