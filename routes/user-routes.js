const express= require('express');
const router= express.Router();
const db =require("../models");
const bcrypt = require('bcrypt')
const jwt= require ('jsonwebtoken')
const privateKey= require('../auth/private_key')  


// CREATION
router.post('/signin', (req, res,next)=>{
    bcrypt.hash(req.body.password, 10)
    .then(
        hash=>{
            const user=new db.User({
              surname:req.body.surname,
              name:req.body.name,
              mail:req.body.mail,
              phone:req.body.phone,
              password:hash
            });
            const token=jwt.sign(
              {userId:user.id},
              privateKey,
              {expiresIn: '24h'}
          )
            user.save()
            .then(()=>res.status(201).json({message: 'Utilisateur créé avec succès.', data: {user, token}}))
            .catch(error=>res.status(400).json({error}));
        }
    )
    .catch(error=>res.status(500).json({error}));
})

// CONNEXION

  router.post('/login', (req, res) => {
    db.User.findOne({ where: { mail: req.body.mail } }).then(user => {
        if(!user){
            const message=`L'utilisateur demandé n'existe pas.`
            return res.status(401).json({message})
        }
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
          
        if(!isPasswordValid) {
            const message=`Le mot de passe est incorrect.`
            return res.status(401).json({message, data:user})
        }
        // JWT
        const token=jwt.sign(
            {userId:user.id},
            privateKey,
            {expiresIn: '24h'}
        )
          const message = `L'utilisateur a été connecté avec succès`;
          return res.json({ message, data:{user, token}  })
      })
      .catch(error=>{
        const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`;
          return res.status(500).json({ message, data: error })
    })
    })
    .catch(error=>{
        const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`;
          return res.status(500).json({ message, data: error })
    })
  })


module.exports = router;