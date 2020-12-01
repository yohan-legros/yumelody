
const express = require("express");
const { Op } = require("sequelize");
const db = require("../database/db");
const router = express.Router();

router.post("/add",(req,res)=>{
    db.newsletter.findOne({
        where:{email:req.body.email}
    })
    .then((newsletter)=>{
        if(!newsletter){
        db.newsletter.create(req.body)
        .then(item => {
            var nodemailer = require("nodemailer");

            var transporter = nodemailer.createTransport({
                service: "gmail",
                 auth: {
                    user: "lodyyume@gmail.com",
                    pass: "Elody97160"
                },
            });

            var mailOptions = {
                from: "lodyyume@gmail.com",
                to: item.email,
                subject: "newsletter",

                html: "<p> Bienvenu dans la famille :D j'espere que vous passerer un bon séjour</p>"
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    res.json(error);
                    console.log(error);
                } else {
                    console.log("email sent" + info.response);
                    res.status(200).json({
                        message:"vous serez tenu au courant des nouvellles du site"
                    })
                }
            });
           
        })
       
    }
    else{
        res.json({
            message:"vous etes déja inscrit a la newsletter"
        })  
    }

    })
    .catch(err=>{
        res.json(err)
    })
})


module.exports=router;