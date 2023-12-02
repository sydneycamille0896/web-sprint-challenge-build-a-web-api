// add middlewares here related to actions
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

async function validateActionId(req,res,next){
    try {
        const actionToGet = await Actions.get(req.params.id);
        if(!actionToGet){
            res.status(404).json({message: `Action not found`});
        } else {
            req.action = actionToGet;
            next();
        }
    } catch(err){
        res.status(500).json({message: `Problem finding action`});
    }
};

async function validateProject(req,res,next) {
    const { project_id } = req.body;
    try{
        const project = await Projects.get(project_id);
        if(!project){
            res.status(404).json({
                message: `project not found`
            });
        } else {
            req.project = project;
            next();
        }
    } catch(err){
        res.status(500).json({
            message: `Problem finding project`
        });
    }
}

async function validateNewAction(req,res,next){
    const { project_id, description, notes } = req.body;
    if(!project_id || !description || !description.trim() || !notes || !notes.trim()){
        res.status(400).json({
            message: `All fields are required`
        })
    } 

    next();
}


module.exports = {
    validateActionId,
    validateProject,
    validateNewAction
}