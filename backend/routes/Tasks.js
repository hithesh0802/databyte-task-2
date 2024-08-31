const express= require('express');
const router= express.Router();
const {getTasks, CreateTask, deleteTask, editTask, removeLabelFromTask, addTasktoProject} = require('../controllers/TaskController');
const authMiddleware = require('../middleware/authMiddleware');
const { messaging } = require('../firebaseAdmin');

router.get('/getTasks',authMiddleware,getTasks);
router.post('/createTasks',authMiddleware,CreateTask);
router.post('/deleteTask',authMiddleware,deleteTask);
router.post('/editTask',authMiddleware,editTask);
router.post('/deleteLabel',authMiddleware,removeLabelFromTask);
router.post('/tasks/:id/project',authMiddleware,addTasktoProject);
module.exports= router;
