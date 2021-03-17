const express= require("express");
const router= express.Router();
const { Op } = require("sequelize");
const db =require("../models");

// READ ALL
router.get("/", (req, res) => {
    if(req.query.CourseId){
        const course= req.query.CourseId;
        return db.Offer.findAndCountAll({
            where:{
                CourseId:{[Op.eq]:`${course}`}
            },
            include:[db.Course, db.Forfait, db.Section]
        }).then(({ count, rows }) => {
            const message = `Il y a ${count} offres qui correspond(ent) au terme de recherche.`;
            res.json({ message, data: rows });
          });

    }else{
        db.Offer.findAll({include:[db.Course, db.Forfait, db.Section]}).then(offer => {
        res.json(offer);
      }).catch(function (err) {
          console.log("findAll failed with error: " + err );
          return null;
      })}
    })

      // READ ONE

router.get("/:id", (req, res) =>{
    db.Offer.findByPk(req.params.id, {include:[db.Course, db.Forfait, db.Section]})
        .then(course => {
          if (course===null) {
            const message="La discipline demandée n'existe pas. Réessayez avec un autre indentifiant."
            return res.status(404).json({message})
          }
          const message = 'La discipline a bien été trouvée.'
          res.json({ message, data: course })
        })
        .catch(error=>{
          const message= "La discipline n'a pas pu être récupérée. Réessayez dans quelques instants."
          res.status(500).json({message, data:error})
        })
  })

module.exports=router;