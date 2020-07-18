const express = require('express')
const actionRouter = require('./routers/actionRouter')
const projectRouter = require('./routers/projectRouter')

const server = express()

server.use(express.json())
server.use(logger)
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

const port = 5000

server.listen(5000, () => {
    console.log(`listening on port ${port}`)
})


function logger(req, res, next){
    console.log(`new request: ${req.method} to ${req.url}`)
    next()
}