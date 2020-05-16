const express = require('express')
const projectData = require('../data/helpers/projectModel')
const actionData = require('../data/helpers/actionModel')

const router = express.Router()

module.exports = router

router.post('/', validateAction, (req, res) => {
    actionData
        .insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(error => {
            console.log('DB error at post `actions/`:', error)
            res.status(500).json({ error: 'couldnt post action data to database'})
        })
})

router.get('/', (req, res) => {
    actionData
        .get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log('DB error at get `actions/`:', error)
            res.status(500).json({ error: 'couldnt get actions data from database'})
        })
})

router.get('/:id', validateId, (req, res) => {
    actionData
        .get(req.params.id)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log('DB error at get `actions/`:', error)
            res.status(500).json({ error: 'couldnt get actino data from database'})
        })
})

router.delete('/:id', validateId, (req, res) => {
    actionData
        .remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'the action was successfully deleted'})
        })
        .catch(error => {
            console.log('DB error at delete `actions/:id`:', error)
            res.status(500).json({ error: 'couldnt remove action data from database'})
        })
})

router.put('/:id', validateId, validateAction, (req, res) => {
    actionData
        .update(req.params.id, req.body)
        .then(updatedAction => {
            res.status(200).json(updatedAction)
        })
        .catch(error => {
            console.log('DB error at put `actions/:id`:', error)
            res.status(500).json({ error: 'couldnt update action data in database'})
        })
})

function validateId(req, res, next) {
    const { id } = req.params
    actionData
      .get(id)
      .then(action => {
        if(action){
          req.action = action
          next()
        } else {
          res.status(400).json({ message: "invalid action id" })
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
    } else if (!req.body.project_id){
        res.status(400).json({ message: "missing required project_id field" })
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