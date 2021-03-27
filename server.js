const express= require('express');
const bodyParser = require("body-parser");
const db=require("./models");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app= express();

app.use(bodyParser.json()).use(cors());

//User
const userRoutes=require('./routes/user-routes')
app.use("/auth", userRoutes);

//Offer
const offerRoutes=require('./routes/offer-routes')
app.use("/offer", offerRoutes);

//Course
const courseRoutes=require('./routes/course-routes')
app.use("/course", courseRoutes);

//Forfait
const forfaitRoutes=require('./routes/forfait-routes')
app.use("/forfait", forfaitRoutes);

//Section
const sectionRoutes=require('./routes/section-routes')
app.use("/section", sectionRoutes);

//Order
const orderRoutes=require('./routes/order-routes')
app.use("/order", orderRoutes);

app.get('/test', async (req, res) => {
    res.json({message: 'pass!'})
  })

module.exports = app;