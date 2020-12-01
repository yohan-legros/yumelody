const express = require("express");
const router = express.Router();
const db = require("../database/db");


router.post("/add", (req, res) => {
    db.abonnement.findOne({
            where: { nom: req.body.nom },
        })
        .then((abonnement) => {
            if (!abonnement) {
                db.abonnement.create(req.body)
                    .then(abonnementitem => {

                        res.status(200).json({ abonnement: abonnementitem });
                    })
                    .catch((err) => {
                        res.json({
                            error: err,
                        });
                    });
            } else {
                res.json("l'abonnement est déja actif");
            }
        })
        .catch((err) => {
            res.json({
                error: err,
            });
        });
});
router.get("/all", (req, res) => {
    db.abonnement
        .findAll()
        .then((reponse) => {
            res.status(200).json({ abonnement: reponse });
        })
        .catch((err) => {
            res.json(err);
        });
});
module.exports = router;