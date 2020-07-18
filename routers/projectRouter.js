const express = require('express')

const router = express.Router()

module.exports = router

router.post('/', validateProject, (req, res) => {
    projectData
        .insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(error => {
            console.log('DB error at post `/`:', error)
            res.status(500).json({ error: 'couldnt post project data to database'})
        })
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