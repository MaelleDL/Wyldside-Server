const express= require("express");
const router= express.Router();
const db =require("../models");

router.post('/new', (req, res)=>{
    db.Section.create(req.body)
      .then(course => {
        const message = `La section ${req.body.name} a bien été crée.`
        res.json({ message, data: course })
      })
      .catch(error=>{
        if(error instanceof ValidationError){
          return res.status(400).json({message:error.message, data: error})
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({message:error.message, data:error})
        }
        const message= "La section n'a pas pu être ajoutée. Réessayez dans quelques instants."
        res.status(500).json({message, data:error})
      })
})



module.exports=router;