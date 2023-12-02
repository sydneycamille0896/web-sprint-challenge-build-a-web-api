// add middlewares here related to projects
const Projects = require('./projects-model');
const Actions = require('../actions/actions-model');

async function validateProject(req,res,next) {
    
    const project = await Projects.get(req.params.id);
    try{
        if(!project){
            return res.status(404).json({
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

 function validateNewProject(req,res,next){
        const {name, description } = req.body;
        if(!name || !name.trim() || !description || !description.trim()){
           return res.status(400).json({
                message:`name and description are required`
            })
        }  
          next();
}

function validateUpdatedProject(req,res,next){
    const {name, description, completed } = req.body;
    if(!name || !name.trim() || !description || !description.trim() || completed === undefined){
       return res.status(400).json({
            message:`name, description, and status are required`
        })
    }  
      next();
}


module.exports = {
    validateProject,
    validateNewProject,
    validateUpdatedProject
}