// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();
const { validateProject, validateNewProject, validateUpdatedProject } = require('./projects-middleware');

// GET all projects
router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch (err) {
        next(err);
    }
});

// GET project by id
router.get('/:id', validateProject, async (req, res, next) => {
    try {
        res.json(req.project);
    } catch (err) {
        next(err);
    }
});

// POST new project
router.post('/', validateNewProject, async (req, res, next) => {
    const newProject = await Projects.insert(req.body);
    try {
        res.status(201).json(newProject);
    } catch (err) {
        next(err);
    }
});

// PUT update existing project
router.put('/:id', [validateProject, validateUpdatedProject], async (req, res, next) => {
    console.log(req.body);

    try {
        const { id } = req.params;
        const projectToUpdate = await Projects.get(id);
        const { name, description, completed } = req.body;
        const updatedProject = await Projects.update(req.params.id, { ...req.body, completed, description, name });
        res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
})

// DELETE existing project
router.delete('/:id', validateProject, async (req, res, next) => {
    const { id } = req.params;
    try {
        const projectToDelete = await Projects.get(id);
        await Projects.remove(id);
        res.status(200).json(projectToDelete);
    } catch (error) {
        next(error);
    }
});

// GET project actions
router.get('/:id/actions', validateProject, async (req, res, next) => {
    const { id } = req.params;
    const projectActions = await Projects.getProjectActions(id);
    try {
        res.status(200).json(projectActions);
    } catch (error) {
        next(error);
    }
});

module.exports = router;