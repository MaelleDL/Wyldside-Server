const express= require("express");
const router= express.Router();
const db =require("../models");
const { ValidationError, UniqueConstraintError }= require('sequelize')

// POST
router.post('/new', async(req, res)=>{

   const savedOrder= await db.Order.create(req.body)
    req.body.Offers.forEach((item)=>{
        const offer= db.Offer.findByPk(item.id);
        if(!offer){
            return res.status(400);
        }
        const OfferOrder={
            order_id:savedOrder.id,
            Offer_id:item.id,
            quantity:item.quantity
        }
        console.log(OfferOrder);
    
        db.Offer_order.create(OfferOrder)
    })
    const message="Commande bien enregitrée."
    return res.status(200).json({message: message, data: savedOrder})
      .catch(error=>{
        if(error instanceof ValidationError){
          return res.status(400).json({message:error.message, data: error})
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({message:error.message, data:error})
        }
        const message= "La commande n'a pas pu être ajoutée. Réessayez dans quelques instants."
        res.status(500).json({message, data:error})
      })
})

// READ ALL
router.get("/", (req, res) => {
    db.Order.findAll( {include:[{model:db.Offer, as:"Offers"}]}).then(order => {
        res.json(order);
      }).catch(function (err) {
          console.log("findAll failed with error: " + err );
          return null;
      })})

module.exports=router;