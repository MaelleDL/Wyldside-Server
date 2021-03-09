const express= require("express");
const router= express.Router();
const db =require("../models");


// POST
router.post('/new', (req, res)=>{
    db.Course.create(req.body)
      .then(course => {
        const message = `La discipline ${req.body.name} a bien été crée.`
        res.json({ message, data: course })
      })
      .catch(error=>{
        if(error instanceof ValidationError){
          return res.status(400).json({message:error.message, data: error})
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({message:error.message, data:error})
        }
        const message= "La discipline n'a pas pu être ajoutée. Réessayez dans quelques instants."
        res.status(500).json({message, data:error})
      })
})

// READ ALL
router.get("/", (req, res) => {
    db.Course.findAll({include:[{model: db.Forfait, as :"Forfaits"}, db.Section]}).then(course => {
        res.json(course);
      }).catch(function (err) {
          console.log("findAll failed with error: " + err );
          return null;
      })})



module.exports=router;