const express= require("express");
const router= express.Router();
const db =require("../models");

router.post('/new', (req, res)=>{
    db.Forfait.create(req.body)
      .then(course => {
        const message = `Le forfait ${req.body.duration} a bien été crée.`
        res.json({ message, data: course })
      })
      .catch(error=>{
        if(error instanceof ValidationError){
          return res.status(400).json({message:error.message, data: error})
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({message:error.message, data:error})
        }
        const message= "Le forfait n'a pas pu être ajoutée. Réessayez dans quelques instants."
        res.status(500).json({message, data:error})
      })
})



module.exports=router;