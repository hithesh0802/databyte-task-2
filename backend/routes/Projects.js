const express= require('express');
const router= express.Router();
const Task= require('../models/Task');
const Project= require('../models/Project');
const authMiddleware = require('../middleware/authMiddleware');
const {createProject,getProjects,updateProject, deleteProject,addCollaborator,removeCollaborator,createTask}= require('../controllers/ProjectController');

router.get('/getProjects',authMiddleware,getProjects);
router.post('/createProject',authMiddleware,createProject);
router.post('/deleteProject/:id',authMiddleware,deleteProject);
router.post('/updateProject/:id',authMiddleware,updateProject);
router.post('/addCollaborator', authMiddleware, addCollaborator);
router.post('/removeCollaborator', authMiddleware, removeCollaborator);
router.post('/:projectId/tasks',createTask);

router.put('/tasks/:taskId', async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
      res.status(200).json(updatedTask);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

router.put('/:projectId', async (req, res) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true });
      res.status(200).json(updatedProject);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

router.delete('/projects/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  try {
      const project = await Project.findOneAndUpdate(
          { 'tasks._id': taskId },
          { $pull: { tasks: { _id: taskId } } },
          { new: true } 
      );
      if (!project) {
          return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
  } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports= router;