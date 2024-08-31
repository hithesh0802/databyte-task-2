const User = require('../models/User');
const CollaboratorRequest = require('../models/Collaborator');
const Project = require('../models/Project');
const Task= require('../models/Task');

const searchUsers= async (req, res) => {
  const username= req.body.q;
  // console.log("hi");
  try {
    const users = await User.find({
        username: { $regex: `^${username}`, $options: 'i' } 
    });
    return res.status(200).json({users});      
  } catch (error) {
    console.error('Error extracting users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
};

const sendRequest = async (req, res) => {
    try {
        const { userId, projectId } = req.body;
        const project = await Project.findById(projectId);
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
        if (!project.pendingCollaborators.includes(userId)) {
          project.pendingCollaborators.push(userId);
          await project.save();
          return res.status(200).json({ message: 'Request sent' });
        } else {
          return res.status(400).json({ message: 'Request already sent' });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

const getdetails=async(req,res)=>{
  const currUser=await User.findById(req.user.id);
  try{
      return res.status(200).json({username: currUser.username , email: currUser.email, id: currUser._id});
  }catch(error){
      return res.status(500).json({error: error.message});
  }
}

const getRequests = async (req, res) => {
  const requests = [];
  try {
    const allProjects = await Project.find();
    
    allProjects.forEach(project => {
      if (project.pendingCollaborators.includes(req.user.id)) {
        requests.push({
          projectId: project._id,
          projectName: project.title,
          projectDescription: project.description,
        });
      }
    });

    return res.status(200).json({ requests });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return res.status(500).json({ message: 'Error fetching requests' });
  }
};

const handleRequest= async (req, res) => {
    try {
        const { projectId } = req.body;
        const userId = req.user.id;
        const project = await Project.findById(projectId);
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }    
        if (!project.pendingCollaborators.includes(req.user.id)) {
          return res.status(400).json({ message: 'No request found' });
        }
        const project2 = await Project.findByIdAndUpdate(
          projectId,
          { $addToSet: { user: collaboratorId } },
          { new: true }
        );        
        if(req.body.condition === "accept")
        project.user.push(req.user.id);
        project.pendingCollaborators = project.pendingCollaborators.filter(id => id.toString() !== req.user.id.toString());
        await project.save();
        res.status(200).json({ message: 'Request accepted' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

module.exports ={searchUsers,sendRequest,handleRequest,getdetails,getRequests};