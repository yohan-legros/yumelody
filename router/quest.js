
const express = require("express");
const db = require("../database/db");

const router = express.Router();


//seule ladmin pourrait utiliser cette route
router.post("/add",(req, res)=>{
   db.quest.findOne({
       where:{nom:req.body.nom}
   })
  .then(quest=>{
       if (!quest){
           db.quest.create(req.body)
           .then((questi)=>{
            res.status(200).json({
                message:"la quete a bien été créer",
                nom:questi.nom
            })

           })
           .catch(err=>{
               res.json(err)
           })
       }
       else{
        res.json("cette quete existe déja")
       }
   })
        
})
   


router.post("/verifier", (req, res)=>{
    db.user.findOne({
        where:{email:req.body.email},
        include:[{
            model: db.quest
        }]
    })
    .then((user)=>{
        for(var i=0; i<user.quests.lenght; i++){
            console.log('ok')
            if(user.quests[i].quest.nom==req.body.nom){
                var faire=user.quests
                console.log(faire)
                    if(!quest){
                        res.json({
                            message:"cette quete est entrain d'etre mise a jour repasser plus tard",
                            accomplie: quest.nom
                        })
                    }
                    else if(quest && quest.condition==true && faire.status==true){
                        res.status(200).json({
                            message:"revenez plus tard vous avez déja compléter cette quete:",
                            accomplie: quest.nom
                        })
                    }
                    else if(quest && faire.status==false && quest.condition==true){
                             const point=user.artpoint;
                             const reward = quest.price;
                             user.update({
                                 artpoint:point+reward,
                                 accomplie:true 
                             })
                            res.status(200).json({
                                message:"vous avez recu votre recompense",
                                
                            })
        
                    }
                    else{
                        res.json("erreur survenu veuillez reassayer ulterieurement")
                    }
            }
            break;
        }
        
       
    })
    .catch(err=>{
        res.json(err)
    })
})

module.exports=router;