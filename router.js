const express = require('express');

const projectData = require('./data/helpers/projectModel.js');

const actionData = require('./data/helpers/actionModel.js')

const router = require('express').Router();

router.get('/', (req,res) => {
    projectData
        .get()
        .then(project => {
            res.status(200).json({project});
        })
        .catch(error => {
            res.status(500).json({error: "The project information could not be retrieved"})
        })
    
})

// router.get('/:id', (req,res) => {
//     projectData
//         .getProjectActions(req.params.id)
//         const actions = {project_id: project.id}
//         .then(actions => {
//             res.status(200).json({actions});
//         })
//         .catch(error => {
//             res.status(500).json({error: "The action information could not be retrieved"})
//         })
// })

router.post('/', (req,res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        res.status(400).json ({errorMessage: "Please provide name and description for the project."})
    }
    projectData
        .insert({
            name,
            description
        })
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            res.status(500).json({error: "There was an error while saving the project to the database."})
        })
})

router.put('/:id', async (req, res) => {
    try {
        const project = await projectData.update(req.params.id, req.body)
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({message: "null"})
        }
    }   catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error updating project"
        });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const count = await projectData.remove(req.params.id);
        if (count > 0) {
          res.status(200).json({ message: `${count} records has been removed`});
        } else {
          res.status(404).json({ message: 'The project could not be found' });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'Error removing the project',
        });
      }
    });

module.exports = router;