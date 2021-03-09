const express= require('express');
const bodyParser = require("body-parser");
const db=require("./models");
const cors = require("cors");
const PORT= 3000;

const app= express();

app.use(bodyParser.json()).use(cors());

// CRUD course
const courseRoutes=require('./routes/course-routes')
app.use("/course", courseRoutes);

// CRUD forfait
const forfaitRoutes=require('./routes/forfait-routes')
app.use("/forfait", forfaitRoutes);

// CRUD section
const sectionRoutes=require('./routes/section-routes')
app.use("/section", sectionRoutes);

db.sequelize.sync().then(()=>{
    app.listen(PORT, () => {
        console.log(`listening at: App is listening on port 3000: http://localhost:${PORT}`)
    })
})