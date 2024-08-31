const User= require('../models/User');
const Project= require('../models/Project');
const Task = require('../models/Task');
const { messaging } = require('../firebaseAdmin');

const getTasks =async(req,res)=>{
    const currUser= await User.findById(req.user.id).populate("tasks");
    try{
        if(currUser){
            req.io.emit('tasksUpdated', currUser);
            return res.status(200).json({tasks: currUser.tasks});
        }
    }catch(error){
        console.log('Error obtaining User tasks');
        return res.status(500).json({message: error.message});
    }
}

const CreateTask = async(req,res)=>{
    
    // console.log("hi",currUser);
    let user=req.user.id;
    let {title,description,deadline,progress,project}= req.body;
    console.log(req.body);
    try{
        const currUser= await User.findById(req.user.id);
        const sanitizedLabels = Array.isArray(req.body.labels) 
            ? req.body.labels.filter(label => typeof label === 'string' && label.trim().length > 0)
            : [];
        let newTask =new Task({title,description,deadline,progress,user: req.user.id, project: project || null,labels: sanitizedLabels});

        console.log({title,description,deadline,progress,user: req.user.id, project: project});
        await newTask.save();
        console.log(newTask);
        currUser.tasks.push(newTask._id);
        await currUser.save();
        console.log(currUser);
        if (project) {
            await Project.findByIdAndUpdate(project, { $push: { tasks: newTask._id } });
        }

        const message = {
            notification: {
              title: 'New Task Created',
              body: `You have created a new task: ${title}`,
              image: 'https://plus.unsplash.com/premium_photo-1682309567426-5517a398b4dd?q=80&w=1824&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            },
            token: "fZiMUurZvOKooOAEeMpGwo:APA91bE1mMn2rIbfCD_BxZHoXEFSyF8uawgDsYZXoOciwF5_3xYmurvZFNYIZ8i2HTQKYttBrbQ5OQlL2Ki0LXUV5l6GYiLqfnRj32VDAkhP0DrnPtH3IVEfGfIzDqgU7le4hSo4DQz-", 
          };
      
          messaging.send(message)
            .then((response) => {
              console.log('Successfully sent message:', response);
            //   res.status(200).send('Task created and notification sent.');
            })
            .catch((error) => {
              console.error('Error sending message:', error);
            //   res.status(500).send('Task created, but failed to send notification.');
            });
        // const tasks = await User.findById(req.user.id).populate("tasks");
        // req.io.emit('tasksUpdated', tasks);
        return res.status(200).json("success");

    }catch(error){
        console.log("err bro");
        return res.status(401).json({message: error.message});
    }
}

const deleteTask = async(req,res)=>{
    try{
        const currUser= await User.findById(req.user.id);
        currUser.tasks.filter(task => task._id !== req.body.id);
        await Task.findByIdAndDelete(req.body.id);
        await currUser.save();
        return res.status(200).json("Succesfully deleted");
    }catch(error){
        console.log(error);
        return res.status(401).json({message: error.message});
    }
}

const editTask =async(req,res)=>{
    try{
        const currUser= await User.findById(req.user.id);

        const sanitizedLabels = Array.isArray(req.body.labels) 
            ? req.body.labels.filter(label => typeof label === 'string' && label.trim().length > 0)
            : [];
        
            const task = await Task.findById(req.body.taskId);

            const updateData = {
                title: req.body.titleTask,
                description: req.body.taskDescription,
                deadline: req.body.deadline,
                progress: req.body.taskProgress,
                labels: sanitizedLabels
            };
    
            if (req.body.projectId) {
                updateData.project = req.body.projectId;
    
                if (task.project && task.project.toString() !== req.body.projectId) {
                    await Project.findByIdAndUpdate(task.project, { $pull: { tasks: task._id } });
                    await Project.findByIdAndUpdate(req.body.projectId, { $push: { tasks: task._id } });
                }
            } else {
                updateData.project = null;
            }
    
            await Task.findByIdAndUpdate(req.body.taskId, updateData, { new: true });
            const message = {
                notification: {
                  title: 'Task Edited!',
                  body: `You have Edited the task successfully!`,
                  image: 'https://plus.unsplash.com/premium_photo-1682309567426-5517a398b4dd?q=80&w=1824&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                },
                token: "fZiMUurZvOKooOAEeMpGwo:APA91bE1mMn2rIbfCD_BxZHoXEFSyF8uawgDsYZXoOciwF5_3xYmurvZFNYIZ8i2HTQKYttBrbQ5OQlL2Ki0LXUV5l6GYiLqfnRj32VDAkhP0DrnPtH3IVEfGfIzDqgU7le4hSo4DQz-", 
              };
          
              messaging.send(message)
                .then((response) => {
                  console.log('Successfully sent message:', response);
                //   res.status(200).send('Task edited and notification sent.');
                })
                .catch((error) => {
                  console.error('Error sending message:', error);
                //   res.status(500).send('Task edited, but failed to send notification.');
                });

            await currUser.save();

        const tasks = await User.findById(req.user.id).populate("tasks");
        req.io.emit('tasksUpdated', tasks);

        return res.status(200).json("Succesfully edited");
    }catch(error){
        console.log(error);
        return res.status(401).json({message: error.message});
    }
}

const removeLabelFromTask = async (req, res) => {
    try {
        console.log(req.body);
        const task = await Task.findById(req.body.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        console.log("Task before update:", task);
        task.labels = task.labels.filter(label => label !== req.body.labelToRemove);
        const updatedTask = await task.save();
        console.log("Task after update:", updatedTask);
        return res.status(200).json({ message: "Label removed successfully", task: updatedTask });
    } catch (error) {
        console.error('Error removing label:', error);
        return res.status(500).json({ message: error.message });
    }
};

const addTasktoProject = async(req,res) =>{
    try {
        const { id } = req.params;
        const { projectId } = req.body;
        const task = await Task.findByIdAndUpdate(id, { project: projectId }, { new: true });
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated', task });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

module.exports= {getTasks,CreateTask,deleteTask,editTask,removeLabelFromTask,addTasktoProject};