require('dotenv').config();

// require your server and launch it
const server = require('./api/server.js')

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`server listening on ${port}`)
})