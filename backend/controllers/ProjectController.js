const Task = require('../models/Task');
const User= require('../models/User');
const Project =require('../models/Project');

const createProject =async(req,res)=>{
        try {
          const project = new Project({ title: req.body.title, description: req.body.description, user: req.user.id });
          await project.save();
          res.status(201).json({ message: 'Project created', project });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
}

const getProjects = async(req,res)=>{
  try {
    const userId = req.user.id;
    const projects = await Project.find({
        user: userId
    }).populate('tasks').populate('user');
    
    res.status(200).json({ projects });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

const updateProject =async(req,res)=>{
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const project = await Project.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project updated', project });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const deleteProject = async(req,res)=>{
    try {
        const { id } = req.params;
        await Project.findByIdAndDelete(id);
        res.status(200).json({ message: 'Project deleted' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const addTask = async(req,res)=>{
    try {
      const { title, description, deadline, progress, labels, projectId, user } = req.body;
      const task = new Task({ title, description, deadline, progress, labels, project: projectId, user });
      await task.save();
      await Project.findByIdAndUpdate(projectId, { $push: { tasks: task._id } });
  
      res.status(201).json({ message: 'Task created', task });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const addCollaborator = async (req, res) => {
  try {
      const { projectId, collaboratorId } = req.body;
      const project = await Project.findByIdAndUpdate(
          projectId,
          { $addToSet: { user: req.user.id } },
          { new: true }
      );
      console.log(project,project.user,
        'hi'
      );
      res.status(200).json(project);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const removeCollaborator = async (req, res) => {
  try {
      const { projectId, collaboratorId } = req.body;
      const project = await Project.findByIdAndUpdate(
          projectId,
          { $pull: { user: collaboratorId } },
          { new: true }
      );
      res.status(200).json(project);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const createTask= async (req, res) => {
  try {
    const { title, description, deadline, labels,progress } = req.body;
    const task = new Task({
      title,
      description,
      deadline,
      progress,
      labels: labels ? labels.split(',').map(label => label.trim()) : [],
      project: req.params.projectId
    });
    await task.save();

    const project = await Project.findById(req.params.projectId);
    project.tasks.push(task._id);
    await project.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports= {createProject,getProjects,updateProject,deleteProject,addTask,addCollaborator,removeCollaborator,createTask};