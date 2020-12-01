    const express = require("express");
    const router = express.Router();
    const db = require("../database/db");
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");
    process.env.SECRET_KEY="secret";

    router.post("/register", (req, res) => {
        db.user.findOne({
                where: { email: req.body.email }
            })
            .then(user => {
                if (!user) {
                    const hash = bcrypt.hashSync(req.body.password, 10);
                    req.body.password = hash;
                    db.user.create(req.body)
                        .then(itemuser => {

                            res.status(200).json({
                                message: "Veuillez valider votre mail",
                                email: itemuser.email
                            })
                        })
                        .catch(err => {
                            res.json(err);
                        })
                } else {
                    res.json("cette adresse mail et déja utilisée")
                }
            })
            .catch(err => {
                res.json(err)
            })
    });


    router.post("/login", (req, res) => {
        db.user.findOne({
                where: { email: req.body.email }
            })
            .then(user => {
                if (user.Status === true) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        let userdata = {
                            nom: user.nom,
                            prenom: user.prenom,
                            username:user.username,
                            email: user.email,
                            image: user.image
                            
                        };
                        let token = jwt.sign(userdata, process.env.SECRET_KEY, {
                            expiresIn: 1440,
                        })
                        res.status(200).json({ token: token })
                    } else {
                        res.json("error mail or error password")
                    }
                } else {
                    res.json({ message: "Vous devez valider votre mail" })
                }
            })
            .catch(err => {
                res.json(err);
            })
    });


    router.post("/forgetpassword", (req, res) => {
        var randtoken = require('rand-token');
        var token = randtoken.generate(16);
        db.user.findOne({
                where: { email: req.body.email }
            })
            .then(user => {
                if (user) {
                    user.update({
                            forget: token
                        }).then(item => {
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
                                subject: "Sending Email using Node.js",

                                html: "<a href=http://localhost:3000/user/pwd/" + item.forget + ">Metter a jour le mot de passe</a>"
                            };

                            transporter.sendMail(mailOptions, function(error, info) {
                                if (error) {
                                    res.json(error);
                                    console.log(error);
                                } else {
                                    console.log("email sent" + info.response);
                                    res.json("email sent" + info.response);
                                }
                            });
                        })
                        .catch(err => {
                            res.json(err)
                        })
                } else {
                    res.status(404).json("user not found");
                }
            })
            .catch(err => {
                res.json(err)
            })
    });

    router.post("/updatepassword", (req, res) => {
        db.user.findOne({
                where: { forget: req.body.forget }
            }).then(user => {
            
                if (user) {
                    const hash = bcrypt.hashSync(req.body.password, 10);
                    req.body.password = hash;
                    user.update({
                            password: req.body.password,
                            forget: null

                        })
                        .then(() => {
                            res.json({
                                message: "votre mot de passe est mis a jour"
                            })
                        })
                        .catch(err => {
                            res.json(err);
                        })
                } else {
                    res.json("link not validé");
                }
            })
            .catch(err => {
                res.json(err)
            })
    });


    router.post("/validemail", (req, res) => {

        db.user.findOne({
                where: { email: req.body.email }
            }).then(user => {
                if (user) {
                    if (user.Status !== 1) {
                        user.update({
                                Status: 1
                            })
                            .then(() => {
                                res.json({
                                    message: "votre email est validé"
                                })
                            })
                            .catch(err => {
                                res.json(err);
                            })
                    } else {
                        res.json("votre mail est déja validé")
                    }
                } else {
                    res.status(404).json("user not found !!!")
                }
            })
            .catch(err => {
                res.json(err)
            })
    });

router.post('/follow',(req,res)=>{
    db.user.findOne({
        where:{email:req.body.email}
    })
    .then ((user)=>{
        if(user){
            db.follow.create({
                follow:user.email,
                compteur:+1
            })
            .then(()=>{
                res.status(200).json({
                    message:"vous suivez maintenant :",
                    name:user.username
                })
            })
            .catch(err => {
                res.json(err)
            })
        }
        else{
            res.json('veuillez dabord vous connecter')
        }
    })
    .catch(err => {
        res.json(err)
    })
})

    router.post("/addOeuvreToUser", (req, res) => {
        db.user.findOne({
            where: {email: req.body.email}
        })
            .then(user => {
                if(user){
                user.addOeuvre([req.body.oeuvreId], { through:{ like:req.body.like, views:req.body.views ,commentaire: req.body.commentaire,note: req.body.note,compteur: req.body.compteur }})
                .then(reps => {
                    res.json(reps)
                  })
                }
                else{
                    res.json("user not found")
                }
            })
            .catch(err => {
                res.send('error' + err)
            })
    });

    router.post("/addQuestToUser", (req, res) => {
        db.user.findOne({
            where: {email: req.body.email}
        })
            .then(user => {
                if(user){
                user.addQuest([req.body.questId], { through:{ accomplie:req.body.accomplie}})
                .then(reps => {
                    res.json(reps)
                  })
                }
                else{
                    res.json("user not found")
                }
            })
            .catch(err => {
                res.send('error' + err)
            })
    });

    module.exports=router;