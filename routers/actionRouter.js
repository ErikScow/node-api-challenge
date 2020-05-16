const express = require('express')
const projectData = require('../data/helpers/projectModel')
const actionData = require('../data/helpers/actionModel')

const router = express.Router()

module.exports = router

router.post('/', validateAction, (req, res) => {

})

router.get('/', (req, res) => {
    actionData
        .get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log('DB error at get`/`:', error)
            res.status(500).json({ error: 'couldnt get project data from database'})
        })
})

router.get('/:id', validateId, (req, res) => {
    actionData
        .get(req.params.id)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log('DB error at get`/`:', error)
            res.status(500).json({ error: 'couldnt get project data from database'})
        })
})

router.delete('/:id', validateId, (req, res) => {
    
})

router.put('/:id', validateId, validateAction, (req, res) => {
    
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

  function validateAction(req, res, next) {
    if(!req.body){
        res.status(400).json({ message: "missing action data" })
    } else if (!req.body.name){
        res.status(400).json({ message: "missing required name field" })
    } else if (!req.body.description){
        res.status(400).json({ message: "missing required description field" })
    } else if (req.body.description.length > 128){
        res.status(400).json({ message: "description length is too long"})
    } else if (!req.body.notes){
        res.status(400).json({ messate: "missing required notes field"})
    } else {
      next()
    }
  }