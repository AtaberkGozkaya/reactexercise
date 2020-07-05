const router = require('express').Router();
let Project = require('../models/projects.model');
const project = require('../models/projects.model');

router.route('/').get((req, res) => {
    Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    

    const newProject = new Project({username, description});
    newProject.save()
    .then(() => res.json('Project added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Project.findById(req.params.id)
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Project.findByIdAndDelete(req.params.id)
    .then(() => res.json('Project deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Project.findById(req.params.id)
    .then(projects => {
        projects.username = req.body.username;
        projects.description = req.body.description;
        

        projects.save()
        .then(() => res.json('Project updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;