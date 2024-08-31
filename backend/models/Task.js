const mongoose= require('mongoose');

const Task= new mongoose.Schema({
    description: {type: String, default:true},
    title: {type: String, required:true, unique: true},
    deadline: {type: Date, required:true},
    progress: {type: Number, default:0},
    project: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' ,default: null}],
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    labels: { 
        type: [String], 
        default: [] 
    }
})

module.exports = mongoose.model('Task',Task);