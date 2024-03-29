
const express = require("express");
const db = require("../database/db");

const router = express.Router();



router.post("/create", (req, res) => {
    db.challenge.findOne({
            where: { titre: req.body.titre },
        })
        .then((challenge) => {
            if (!challenge) {
                db.challenge.create(req.body)
                    .then(challengeitem => {

                        res.status(200).json({ abonnement: challengeitem });
                    })
                    .catch((err) => {
                        res.json({
                            error: err,
                        });
                    });
            } else {
                res.json("le challenge existe déja");
            }
        })
        .catch((err) => {
            res.json({
                error: err,
            });
        });
});

router.get("/all", (req, res) => {
    db.challenge
        .findAll()
        .then((reponse) => {
            res.status(200).json({ challenge: reponse });
        })
        .catch((err) => {
            res.json(err);
        });
});
module.exports=router;
