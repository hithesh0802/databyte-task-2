const mongoose= require('mongoose');

const UserSchema= new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
    requests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
})

module.exports= mongoose.model('User',UserSchema);