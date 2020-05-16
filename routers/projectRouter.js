const express = require('express')
const projectData = require('../data/helpers/projectModel')

const router = express.Router()

module.exports = router

router.post('/', validateProject, (req, res) => {

})

router.get('/', (req, res) => {
    
})

router.get('/:id', validateId, (req, res) => {
    
})

router.delete('/:id', validateId, (req, res) => {
    
})

router.put('/:id', validateId, validateProject, (req, res) => {
    
})

function validateId(req, res, next) {
    const { id } = req.params
    projectData
      .get(id)
      .then(project => {
        if(project){
          req.project = project
          next()
        } else {
          res.status(400).json({ message: "invalid project id" })
        }
      })
      .catch(error => {
        console.log(`${req.method} could not complete: `, error)
        res.status(500).json({ error: "could not retrieve from database"})
      })
  
  }

function validateProject(req, res, next) {
    if(!req.body){
        res.status(400).json({ message: "missing project data" })
    } else if (!req.body.name){
        res.status(400).json({ message: "missing required name field" })
    } else if (!req.body.description){
        res.status(400).json({ message: "missing required description field" })
    } else {
      next()
    }
  }