const express = require('express')
const projectData = require('../data/helpers/projectModel')
const actionData = require('../data/helpers/actionModel')

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

router.get('/', (req, res) => {
    projectData
        .get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log('DB error at get `/`:', error)
            res.status(500).json({ error: 'couldnt get project data from database'})
          })
})

router.get('/:id', validateId, (req, res) => {
    projectData
        .get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            console.log('DB error at get `/:id`:', error)
            res.status(500).json({ error: 'couldnt get project data from database'})
        })
})

router.get('/:id/actions', validateId, (req, res) => {
    projectData
        .getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(error => {
            console.log('DB error at get `/:id/actions`:', error)
            res.status(500).json({ error: 'couldnt get project actions data from database'})
        })
})

router.delete('/:id', validateId, (req, res) => {
    projectData
        .remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'project was successfully deleted'})
        })
        .catch(error => {
            console.log('DB error at delete `/:id`:', error)
            res.status(500).json({ error: 'couldnt remove project data from database'})
        })
})

router.put('/:id', validateId, validateProject, (req, res) => {
    projectData
        .update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(200).json(updatedProject)
        })
        .catch(error => {
            console.log('DB error at put `/:id`:', error)
            res.status(500).json({ error: 'couldnt update project data in database'})
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