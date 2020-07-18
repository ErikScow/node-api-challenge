const express = require('express')

const router = express.Router()

module.exports = router

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