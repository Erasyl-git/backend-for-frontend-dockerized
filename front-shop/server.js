const express = require('express')
const app = express()
const port = 3000

app.use(express.static('./frontend/build'))

app.listen(port, () => console.log('server has been started on port 3000'))
