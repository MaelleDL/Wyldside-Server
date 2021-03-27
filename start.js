const PORT = process.env.PORT || 3000;
const app = require('./server.js')
app.listen(PORT, () => {
    console.log(`listening at: App is listening on port ${PORT}: http://localhost:${PORT}`)
})