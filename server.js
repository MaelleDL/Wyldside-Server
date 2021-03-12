const express= require('express');
const bodyParser = require("body-parser");
const db=require("./models");
const cors = require("cors");
const PORT= 3000;

const app= express();

app.use(bodyParser.json()).use(cors());

// CRUD User
const userRoutes=require('./routes/user-routes')
app.use("/auth", userRoutes);

// CRUD Offer
const offerRoutes=require('./routes/offer-routes')
app.use("/offer", offerRoutes);

// CRUD Course
const courseRoutes=require('./routes/course-routes')
app.use("/course", courseRoutes);

// CRUD Forfait
const forfaitRoutes=require('./routes/forfait-routes')
app.use("/forfait", forfaitRoutes);

// CRUD Section
const sectionRoutes=require('./routes/section-routes')
app.use("/section", sectionRoutes);

db.sequelize.sync().then(()=>{
    app.listen(PORT, () => {
        console.log(`listening at: App is listening on port 3000: http://localhost:${PORT}`)
    })
})