require('dotenv').config();

// require your server and launch it
const server = require('./api/server')

const port = process.env.PORT || 1213;

server.listen(port, () => {
    console.log(`server listening on ${port}`)
})