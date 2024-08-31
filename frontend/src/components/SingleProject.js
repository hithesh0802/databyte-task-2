import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchUsers from './Search';
import '../styling/singleProject.css';
import '../styling/dashboard.css'; 

const SingleProject = ({ project }) => {

  const [formValues, setFormValues] = useState({
    title: project.title || '',
    description: project.description || '',
    deadline: project.deadline ? new Date(project.deadline) : null,
    progress: project.progress || '0' ,
    tasks: project.tasks.map(task => ({
      ...task,
      deadline: task.deadline ? new Date(task.deadline) : null,
    })),
    pendingCollaborators: project.pendingCollaborators || [],
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', deadline: '', labels: [] ,progress: '0'});
  const API_URL = 'https://databyte-task-2.onrender.com';

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleTaskInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleTaskEditChange = (taskId, e) => {
    const updatedTasks = formValues.tasks.map(task => 
      task._id === taskId ? { 
          ...task, 
          [e.target.name]: e.target.name === 'deadline' ? new Date(e.target.value) : e.target.value 
      } : task
  );
    setFormValues({ ...formValues, tasks: updatedTasks });
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(`${API_URL}/projects/${project._id}/tasks`, newTask);
      setFormValues({ ...formValues, tasks: [...formValues.tasks, response.data] });
      setNewTask({ title: '', description: '', deadline: '', labels: [],progress: 0 });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async (taskId) => {
    const taskToUpdate = formValues.tasks.find(task => task._id === taskId);
    try {
      const response = await axios.put(`${API_URL}/projects/tasks/${taskId}`, taskToUpdate);
      const updatedTasks = formValues.tasks.map(task => 
        task._id === taskId ? response.data : task
      );
      setFormValues({ ...formValues, tasks: updatedTasks });
      setEditingTaskId(null);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleSaveProject = async () => {
    try {
      const result = await axios.put(`${API_URL}/projects/${project._id}`, {
        ...formValues,
        deadline: formValues.deadline ? formValues.deadline.toISOString() : null,
        tasks: formValues.tasks.map(task => ({
          ...task,
          deadline: task.deadline instanceof Date && !isNaN(task.deadline) ? task.deadline.toISOString() : null,
        })),
      });
      console.log(result, "Project saved successfully!");
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/projects/tasks/${taskId}`);
      setFormValues({
        ...formValues,
        tasks: formValues.tasks.filter(task => task._id !== taskId)
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="sp-page-wrapper">
    <header className="sp-header-area">
        <h1 className="sp-main-title">Project: {formValues.title || 'Edit Project'}</h1>
    </header>
    <div className="sp-content-box">
        <div className="sp-project-details">
            <h2>Project Details</h2>
            <form>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={handleInputChange}
                        className="sp-input-text"
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formValues.description}
                        onChange={handleInputChange}
                        className="sp-textarea"
                    />
                </label>
                <label>
                    Deadline:
                    <input
                        type="date"
                        name="deadline"
                        value={formValues.deadline ? formValues.deadline.toISOString().split('T')[0] : ''}
                        onChange={handleInputChange}
                        className="sp-input-date"
                    />
                </label>
            </form>
        </div>
        <div className="sp-tasks-box">
            <h2>Tasks</h2>
            <ul className="sp-task-list">
                {formValues.tasks.map((task) => (
                    <li key={task._id} className="sp-task-item">
                        {editingTaskId === task._id ? (
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    value={task.title}
                                    onChange={(e) => handleTaskEditChange(task._id, e)}
                                    className="sp-task-input"
                                />
                                <textarea
                                    name="description"
                                    value={task.description}
                                    onChange={(e) => handleTaskEditChange(task._id, e)}
                                    className="sp-task-textarea"
                                />
                                <input
                                    type="date"
                                    name="deadline"
                                    value={task.deadline ? task.deadline.toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleTaskEditChange(task._id, e)}
                                    className="sp-task-input"
                                />
                                <label htmlFor='range'>Drag to select your current Progress</label>
                                <input
                                    type="range"
                                    name="progress"
                                    value={task.progress}
                                    onChange={(e) => handleTaskEditChange(task._id, e)}
                                    className="sp-task-input"
                                />
                                <input
                                    type="text"
                                    name="labels"
                                    value={task.labels.join(', ')}
                                    onChange={(e) => handleTaskEditChange(task._id, e)}
                                    className="sp-task-input"
                                />
                                <button onClick={() => handleEditTask(task._id)} className="sp-task-button">
                                    Save Task
                                </button>
                            </div>
                        ) : (
                            <div>
                                <strong>{task.title}:</strong> - <i style={{ color: 'white' }}>{task.description}</i>
                                <button onClick={() => setEditingTaskId(task._id)} className="sp-task-button">
                                    Edit
                                </button>
                                <button onClick={() => handleTaskDelete(task._id)} className="sp-task-button">
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div className="sp-add-task-box">
                <h3>Add New Task</h3>
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={handleTaskInputChange}
                    className="sp-add-input-text"
                />
                <textarea
                    name="description"
                    placeholder="Task Description"
                    value={newTask.description}
                    onChange={handleTaskInputChange}
                    className="sp-add-textarea"
                />
                <input
                    type="date"
                    name="deadline"
                    value={newTask.deadline}
                    onChange={handleTaskInputChange}
                    className="sp-add-input-date"
                />
                <label htmlFor='range'>Drag to select your current Progress</label>
                <input
                    required
                    type='range'
                    id='range'
                    min={0}
                    max={100}
                    name='progress'
                    value={newTask.progress}
                    onChange={handleTaskInputChange}
                    placeholder="Task Progress"
                />
                <input
                    type="text"
                    name="labels"
                    placeholder="Labels (comma separated)"
                    value={newTask
                      .labels}
                      onChange={handleTaskInputChange}
                      className="sp-add-input-text"
                  />
                  <button onClick={handleAddTask} className="sp-add-task-button">
                      Add Task
                  </button>
              </div>
          </div>
      </div>
      <button onClick={handleSaveProject} className="sp-save-button">
          Save Project
      </button>
  </div>
  );
};  

export default SingleProject;

