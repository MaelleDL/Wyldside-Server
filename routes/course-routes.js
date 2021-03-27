const express= require("express");
const router= express.Router();
const db =require("../models");
const { ValidationError, UniqueConstraintError }= require('sequelize');
const isAdmin=require('../auth/isAdmin');


// POST
router.post('/new', isAdmin, (req, res)=>{
    db.Course.create(req.body)
      .then(course => {
        const message = `La discipline ${req.body.name} a bien été crée.`
        res.status(200).json({ message, data: course })
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
        res.status(200).json(course);
      }).catch(function (err) {
          console.log("findAll failed with error: " + err );
          return null;
      })})


// READ ONE

router.get("/:id", (req, res) =>{
  db.Course.findByPk(req.params.id, {include:[{model: db.Forfait, as :"Forfaits"}, db.Section]})
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


// UPDATE

router.put('/:id', isAdmin, (req, res) => {
  const id = req.params.id
  db.Course.update(req.body, {
    where: { id: id }
  })
  .then(_ => { 
    return db.Course.findByPk(id).then(course => {
      if (course===null) {
      const message="La discipline demandée n'existe pas. Réessayez avec un autre indentifiant."
        return res.status(404).json({message})
      }
      const message = `La discipline ${course.name} a bien été modifiée.`
      res.status(200).json({message, data: course })
    })
  })
  .catch(error=>{
    if(error instanceof ValidationError){
      return res.status(400).json({message:error.message, data: error})
    }
    if(error instanceof UniqueConstraintError){
      return res.status(400).json({message:error.message, data:error})
    }
      const message= "La discipline n'a pas pu être modifiée. Réessayez dans quelques instants."
      res.status(500).json({message, data:error})
    })
})


// DELETE

router.delete('/:id', isAdmin, (req, res) => {
  db.Course.findByPk(req.params.id).then(course => {
    if (course===null) {
      const message="La discipline demandée n'existe pas. Réessayez avec un autre indentifiant."
        return res.status(404).json({message})
      }
    const courseDeleted = course;
    course.destroy({
      where: { id: course.id }
    })
    .then(_ => {
      const message = `La discipline avec l'identifiant n°${courseDeleted.id} a bien été supprimée.`
      res.status(200).json({message, data: courseDeleted })
    })
  })
  .catch(error=>{
    const message= "La discipline n'a pas pu être supprimée. Réessayez dans quelques instants."
    res.status(500).json({message, data:error})
  })
})



module.exports=router;