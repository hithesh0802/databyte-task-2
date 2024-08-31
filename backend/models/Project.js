const mongoose= require('mongoose');

const ProjectSchema= new mongoose.Schema({
    user: [{type: mongoose.Schema.Types.ObjectId , ref:'User'}],
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    title:{type: String, required: true},
    description: {type: String, required: true},
    progress: {type: Number},
    pendingCollaborators: [{type: mongoose.Schema.Types.ObjectId , ref:'User'}],
})

module.exports= mongoose.model('Project',ProjectSchema);