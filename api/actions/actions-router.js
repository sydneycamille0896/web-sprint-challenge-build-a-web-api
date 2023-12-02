// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();
// import middleware here
const { validateActionId, validateProject, validateNewAction } = require('./actions-middlware');


// GET all actions
router.get('/',async (req,res,next) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    } catch(error){
        next(error);
    }
})

// GET action by id
router.get('/:id', validateActionId, async (req,res,next)=>{
    const { id } = req.params;
    const action = await Actions.get(id);
    try{
        res.status(200).json(action);
    } catch(err){
        next(err);
    }
})

// POST new action
router.post('/', [validateProject, validateNewAction], async (req,res,next) => {
    try {
        const newAction = await Actions.insert(req.body);
        res.status(201).json(newAction);
    } catch (err){
        next(err);
    }
});

// PUT update existing action
router.put('/:id', [validateActionId, validateNewAction], async (req,res,next) => {
    const { project_id, description, notes } = req.body;
    try{
        const updatedAction = await Actions.update(req.params.id, {...req.body, project_id, description, notes});
        res.status(200).json(updatedAction);
    } catch(err){
        next(err);
    }
})

// DELETE existing action
router.delete('/:id', [validateActionId], async (req,res,next) => {
    const { id } = req.params;
    try {
        await Actions.remove(id);
        res.status(200).json();
    } catch(err){
        next(err);
    }
});

module.exports = router;