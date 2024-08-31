import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTasks,createTask,deleteTask,editingTask,deleteLabel,fetchProjects } from '../context/api';
import { io } from 'socket.io-client';
import '../styling/dashboard.css';

const DashBoard = () => {
    // const [tasks, setTasks] = useState([]);
    // const [projects, setProjects] = useState([]);
    // const [formData, setFormData] = useState({
    //     titleTask: "",
    //     taskDescription: "",
    //     deadline: new Date().toISOString().split('T')[0],
    //     taskProgress: 0,
    //     labels: [],
    //     newLabel: '',
    //     projectId: ''
    // });
    // const [filterLabel, setFilterLabel] = useState('');
    // const [editingTaskId, setEditingTaskId] = useState(null);
    // const [isEditing, setIsEditing] = useState(false);
    // const [taskEditing, setTaskEditing] = useState({});
    // const navigate = useNavigate();
    // const socket = io('http://localhost:5000');

    // useEffect(() => {
    //     const getTasks = async () => {
    //         const token = localStorage.getItem('token');
    //         const results = await fetchTasks(token);
    //         setTasks(results.tasks);
    //     };
    //     getTasks();

    //     socket.on('tasksUpdated', updatedTasks => {
    //         setTasks(updatedTasks.tasks);
    //     });

    //     return () => {
    //         socket.off('tasksUpdated');
    //     };
    // }, []);

    // useEffect(() => {
    //     const getProjects = async () => {
    //         const results = await fetchProjects();
    //         setProjects(results.projects);
    //     };
    //     getProjects();

    //     socket.on('projectsUpdated', updatedProjects => {
    //         setProjects(updatedProjects);
    //     });

    //     return () => {
    //         socket.off('projectsUpdated');
    //     };
    // }, []);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prev => ({ ...prev, [name]: value }));
    // };

    // const handleAddLabel = (e) => {
    //     e.preventDefault();
    //     const { labels, newLabel } = formData;
    //     if (newLabel && !labels.includes(newLabel.trim())) {
    //         setFormData(prev => ({
    //             ...prev,
    //             labels: [...labels, newLabel.trim()],
    //             newLabel: ''
    //         }));
    //     }
    // };

    // const handleRemoveLabel = async (labelToRemove, task) => {
    //     const token = localStorage.getItem('token');
    //     try {
    //         await deleteLabel(token, task._id, labelToRemove);
    //         setTasks(prevTasks =>
    //             prevTasks.map(t =>
    //                 t._id === task._id
    //                     ? { ...t, labels: t.labels.filter(label => label !== labelToRemove) }
    //                     : t
    //             )
    //         );
    //     } catch (error) {
    //         console.error('Failed to delete label:', error.message);
    //     }
    // };

    // const filterTasksByLabel = () => {
    //     if (!filterLabel) return tasks;
    //     return tasks.filter(task => task.labels.includes(filterLabel));
    // };

    // const handleTaskDelete = async (taskId) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         await deleteTask(token, taskId);
    //         setTasks(tasks.filter(task => task._id !== taskId));
    //     } catch (error) {
    //         console.error('Failed to delete task:', error.message);
    //     }
    // };

    // const handleEditTask = async (e, taskId) => {
    //     e.preventDefault();
    //     const token = localStorage.getItem('token');
    //     try {
    //         const title= formData.titleTask;
    //         const description= formData.taskDescription;
    //         const deadline= formData.deadline;
    //         const progress= formData.taskProgress;
    //         const project= formData.projectId;
    //         const labels= formData.labels;
    //         await editingTask(token, {
    //             taskId,title,description,deadline,progress,project,labels 
    //         });
    //         const results = await fetchTasks(token);
    //         setTasks(results.tasks);
    //         resetForm();
    //     } catch (error) {
    //         console.error('Failed to edit task:', error.message);
    //     }
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const token = localStorage.getItem('token');
    //         console.log(formData);
    //         let body= {title: formData.titleTask ,description: formData.taskDescription,deadline: formData.deadline,progress: formData.taskProgress ,project: formData.projectId, labels: formData.labels};
    //         const title= formData.titleTask;
    //         const description= formData.taskDescription;
    //         const deadline= formData.deadline;
    //         const progress= formData.taskProgress;
    //         const project= formData.projectId;
    //         const labels= formData.labels;
    //         await createTask({ token,title,description,deadline,progress,project,labels});
    //         const result = await fetchTasks(token);
    //         setTasks(result.tasks);
    //         resetForm();
    //     } catch (error) {
    //         console.log({ message: error.message });
    //     }
    // };

    // const resetForm = () => {
    //     setFormData({
    //         titleTask: "",
    //         taskDescription: "",
    //         deadline: new Date().toISOString().split('T')[0],
    //         taskProgress: 0,
    //         labels: [],
    //         newLabel: '',
    //         projectId: ''
    //     });
    //     setEditingTaskId(null);
    //     setIsEditing(false);
    //     setTaskEditing({});
    // };

    // const gotoProjects = () => {
    //     navigate('/project');
    // };

    // const handleSignOut = () => {
    //     localStorage.removeItem('token');
    //     navigate('/login');
    // };

    // const gotoAccount = () => {
    //     navigate('/account');
    // };

    // return (
    //     <div className="dashboard-container">
    //         <div className="sidebardash">
    //             <h2>Dashboard</h2>
    //             <ul>
    //                 <li onClick={gotoProjects}>Projects</li>
    //                 <li onClick={gotoAccount}>My Account</li>
    //                 <li onClick={handleSignOut}>Sign Out</li>
    //             </ul>
    //         </div>
    //         <div className="main-content">
    //             <nav className="navbar">
    //                 <h1>Your Tasks</h1>
    //             </nav>
    //             <div className="filter-section">
    //                 <label>Filter by Label:</label>
    //                 <select value={filterLabel} onChange={(e) => setFilterLabel(e.target.value)}>
    //                     <option value="">All</option>
    //                     {Array.from(new Set(tasks.flatMap(task => task.labels))).map((label, index) => (
    //                         <option key={index} value={label}>{label}</option>
    //                     ))}
    //                 </select>
    //             </div>

    //             <div className="task-list">
    //                 {filterTasksByLabel().map((task, index) => (
    //                     <div className="task-card" key={index}>
    //                         <div className="task-header">
    //                             <h4>{task.title}</h4>
    //                             <div className="task-actions">
    //                                 <button className="delete-btn" onClick={() => handleTaskDelete(task._id)}>Delete</button>
    //                                 <button className="edit-btn" onClick={() => { setIsEditing(true); setEditingTaskId(task._id); setTaskEditing(task); }}>Edit</button>
    //                             </div>
    //                         </div>
    //                         <div className="task-details">
    //                             <p>Description: {task.description}</p>
    //                             <p>Progress: {task.progress}%</p>
    //                             <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
    //                             {task.labels && task.labels.length > 0 && (
    //                                 <div className="task-labels">
    //                                     Labels:
    //                                     {task.labels.map((label, index) => (
    //                                         <span key={index} className="task-label">
    //                                             {label}
    //                                             <button className="remove-label-btn" onClick={() => handleRemoveLabel(label, task)}>x</button>
    //                                         </span>
    //                                     ))}
    //                                 </div>
    //                             )}
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>

    //         <div className="form-container">
    //             <form className="task-form" onSubmit={isEditing ? (e) => handleEditTask(e, editingTaskId) : handleSubmit}>
    //                 <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
    //                 <div className="form-group">
    //                     <input
    //                         type="text"
    //                         name="titleTask"
    //                         value={formData.titleTask || taskEditing.title}
    //                         onChange={handleInputChange}
    //                         placeholder="Task Title"
    //                     />
    //                     <input
    //                         type="text"
    //                         name="taskDescription"
    //                         value={formData.taskDescription || taskEditing.description}
    //                         onChange={handleInputChange}
    //                         placeholder="Task Description"
    //                     />
    //                     <input
    //                         type="date"
    //                         name="deadline"
    //                         value={formData.deadline}
    //                         onChange={handleInputChange}
    //                     />
    //                     <input
    //                         type="number"
    //                         name="taskProgress"
    //                         value={formData.taskProgress || taskEditing.progress}
    //                         onChange={handleInputChange}
    //                         placeholder="Progress (%)"
    //                         min="0"
    //                         max="100"
    //                     />
    //                     <select
    //                         name="projectId"
    //                         value={formData.projectId}
    //                         onChange={handleInputChange}
    //                     >
    //                         <option value="">Select Project</option>
    //                         {projects.map((project) => (
    //                             <option key={project._id} value={project._id}>
    //                                 {project.title}
    //                             </option>
    //                         ))}
    //                     </select>
    //                 </div>

    //                 <div className="label-section">
    //                     <input
    //                         type="text"
    //                         name="newLabel"
    //                         value={formData.newLabel || taskEditing.labels}
    //                         onChange={handleInputChange}
    //                         placeholder="Add Label"
    //                     />
    //                     <button onClick={handleAddLabel}>Add Label</button>
    //                 </div>

    //                 <div className="label-list">
    //                     {formData.labels.map((label, index) => (
    //                         <span key={index} className="label-item">
    //                             {label}
    //                             <button onClick={() => setFormData((prev) => ({
    //                                 ...prev,
    //                                 labels: prev.labels.filter((l) => l !== label)
    //                             }))}>
    //                                 x
    //                             </button>
    //                         </span>
    //                     ))}
    //                 </div>

    //                 <button type="submit" className="submit-btn">
    //                     {isEditing ? 'Update Task' : 'Create Task'}
    //                 </button>
    //             </form>
    //         </div>
    //     </div>
    // );

    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const [deadline, setDeadline] = useState(new Date().toISOString().split('T')[0]); 
    const [titleTask, setTitleTask] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskProgress, setTaskProgress] = useState(0);
    const [labels, setLabels] = useState([]);
    const [newLabel, setNewLabel] = useState('');
    const [result, setResult] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [taskEditing, setTaskEditing] = useState([]);
    const [filterLabel, setFilterLabel] = useState('');
    const [projectId, setProjectId] = useState('');
    const [projects, setProjects] = useState([]);
    const socket = io('http://localhost:5000');

    useEffect(() => {
        const getTasks = async () => {
            const token = localStorage.getItem('token');
            const results = await fetchTasks(token);
            setTasks(results.tasks);
            setTasks(tasks => tasks?.sort((a,b)=> new Date(a.deadline) - new Date(b.deadline)));
        };
        getTasks();

        socket.on('tasksUpdated', updatedTasks => {
            setTasks(updatedTasks.tasks);
        });

        return () => {
            socket.off('tasksUpdated');
        };
    }, []);

    useEffect(() => {
        const getProjects = async () => {
          const results = await fetchProjects();
          setProjects(results.projects);
        };
        getProjects();

        socket.on('projectsUpdated', updatedProjects => {
            setProjects(updatedProjects);
        });
    
        return () => {
            socket.off('projectsUpdated');
        };
      }, []);

    const handleAddLabel = (e) => {
        e.preventDefault();
        if (newLabel && !labels.includes(newLabel.trim())) {
            setLabels([...labels, newLabel.trim()]);
            setNewLabel(''); 
        }
    };

    const handleRemoveLabel = async (labelToRemove, task) => {
        setLabels(labels.filter(label => label !== labelToRemove));
        const token = localStorage.getItem('token');
        try {
            await deleteLabel(token, task._id, labelToRemove);
            setTasks(prevTasks => 
                prevTasks.map(t => 
                    t._id === task._id 
                    ? { ...t, labels: t.labels.filter(label => label !== labelToRemove) } 
                    : t
                )
            );
        } catch (error) {
            console.error('Failed to delete label:', error.message);
        }
    };

    const filterTasksByLabel = () => {
        if (!filterLabel) return tasks; 
        return tasks.filter(task => task.labels.includes(filterLabel));
    };

    const handleTaskDelete = async (taskId) => {
        try {
            const token = localStorage.getItem('token');
            await deleteTask(token, taskId);
            setTasks(tasks.filter(task => task._id !== taskId)); 
        } catch (error) {
            console.error('Failed to delete task:', error.message);
        }
    };

    const handleEditTask = async (e, taskId) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const projectIdToSend = projectId || (taskEditing.project && taskEditing.project.length > 0 ? taskEditing.project[0] : null);
            await editingTask(token, {
                taskId, 
                titleTask: titleTask || taskEditing.title, 
                taskDescription: taskDescription || taskEditing.description, 
                deadline: deadline || taskEditing.deadline.split('T')[0], 
                taskProgress: taskProgress || taskEditing.progress, 
                labels: labels || taskEditing.labels, 
                projectId: projectIdToSend 
            });

            const results = await fetchTasks(token);
            setTasks(results.tasks);
            setEditingTaskId(null);
            setTaskEditing([]);
            setIsEditing(false);
            setTitleTask('');
            setTaskDescription('');
            setDeadline(new Date().toISOString().split('T')[0]);
            setTaskProgress(0);
            setLabels([]);
            setNewLabel("");
            setProjectId("");
        } catch (error) {
            console.error('Failed to edit task:', error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(titleTask, taskDescription, deadline, taskProgress );
        try {
            const token = localStorage.getItem('token');
            const results = await createTask({
                token,
                title: titleTask,
                description: taskDescription,
                deadline: deadline, 
                progress: taskProgress,
                labels: labels,
                project: projectId
            });
            setResult("Created!");
            console.log(results);
            const result = await fetchTasks(token);
            setTasks(result.tasks);
        } catch (error) {
            console.log({ message: error.message });
        }
    };

    const gotoProjects = () => {
        navigate('/project');
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const gotoAccount = () => {
        navigate('/account');
    };

    return (
//         <div className="dashboard-container">
//             <div className="sidebardash">
//                 <h2>Dashboard</h2>
//                 <ul>
//                     <li onClick={gotoProjects}>Projects</li>
//                     <li onClick={gotoAccount}>My Account</li>
//                     <li onClick={handleSignOut}>Sign Out</li>
//                 </ul>
//             </div>
//             <div className="main-content">
//                 <nav className="navbar">
//                     <h1>Your Tasks</h1>
//                 </nav>
//                 <div className="filter-section">
//                     <label >Filter by Label:</label>
//                     <select value={filterLabel} onChange={(e) => setFilterLabel(e.target.value)}>
//                         <option value="">All</option>
//                         {Array.from(new Set(tasks.flatMap(task => task.labels))).map((label, index) => (
//                             <option key={index} value={label}>{label}</option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className="task-list">
//                     {tasks && (
//                         filterTasksByLabel().map((task, index) => (
//                             <div className="task-card" key={index}>
//                                 <div className="task-header">
//                                     <h4>{task.title}</h4>
//                                     <div className="task-actions">
//                                         <button className="delete-btn" onClick={() => handleTaskDelete(task._id)}>Delete</button>
//                                         <button className="edit-btn" onClick={() => { setIsEditing(true); setEditingTaskId(task._id); setTaskEditing(task); setLabels(task.labels);}}>Edit</button>
//                                     </div>
//                                 </div>
//                                 <div className="task-details">
//                                     <p>Description: {task.description}</p>
//                                     <p>Progress: {task.progress}%</p>
//                                     <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
//                                     {task.labels && task.labels.length > 0 && (
//                                         <div className="task-labels">
//                                             Labels: 
//                                             {task.labels.map((label, index) => (
//                                                 <span key={index} className="task-label">
//                                                     {label}
//                                                     <button className="remove-label-btn" onClick={() => handleRemoveLabel(label, task)}>x</button>
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//             <div className='form-container' >
//             { !editingTaskId && (
//             <form className="task-form create-task-form" onSubmit={handleSubmit}>
//                 <h2>Create New Task </h2>
//                 <div className="form-group">
//                     <input
//                         type="text"
//                         value={titleTask}
//                         onChange={(e) => setTitleTask(e.target.value)}
//                         placeholder="Task Title"
//                     />
//                     <input
//                         type="text"
//                         value={taskDescription}
//                         onChange={(e) => setTaskDescription(e.target.value)}
//                         placeholder="Task Description"
//                     />
//                     <input
//                         type="date"
//                         value={deadline}
//                         onChange={(e) => setDeadline(e.target.value)}
//                     />
//                     <label htmlFor='range'>Drag to select your current Progress</label>
//                     <input
//                         required type='range' id='range' min={0} max={100} name='progress'
//                         value={taskProgress}
//                         onChange={(e) => setTaskProgress(Number(e.target.value))}
//                         placeholder="Task Progress"
//                     />
//                     <select
//                         value={projectId}
//                         onChange={(e) => setProjectId(e.target.value)}
//                     >
//                         <option value="">Select Project</option>
//                         {projects.map(project => (
//                         <option key={project._id} value={project._id}>
//                             {project.title}
//                         </option>
//                         ))}
//                     </select>
//                     <div className="labels-section">
//                         <input 
//                             type='text'
//                             value={newLabel}
//                             onChange={(e) => setNewLabel(e.target.value)}
//                             placeholder="Add a label"
//                         />
//                         <button onClick={handleAddLabel}>Add Label</button>
//                     </div>
//                 </div>
//                 <button className="submit-button" type="submit">Create Task</button>
//             </form>
//             )}

// {editingTaskId && (
//                     <form className="task-form edit-task-form" onSubmit={(e) => handleEditTask(e, editingTaskId)}>
//                         <h2>Edit Task Here</h2>
//                         <div className="form-group">
//                             <input
//                                 type="text"
//                                 value={titleTask || taskEditing?.title || ''}
//                                 onChange={(e) => setTitleTask(e.target.value)}
//                                 placeholder="Task Title"
//                             />
//                             <input
//                                 type="text"
//                                 value={taskDescription || taskEditing?.description || ''}
//                                 onChange={(e) => setTaskDescription(e.target.value)}
//                                 placeholder="Task Description"
//                             />
//                             <input
//                                 type="date"
//                                 value={deadline || taskEditing?.deadline?.split('T')[0] || ''}
//                                 onChange={(e) => setDeadline(e.target.value)}
//                             />
//                             <label htmlFor='range'>Drag to select your current Progress</label>
//                             <input
//                                 required type='range' id='range' min={0} max={100} name='progress'
//                                 value={taskProgress || taskEditing?.progress || 0}
//                                 onChange={(e) => setTaskProgress(Number(e.target.value))}
//                                 placeholder="Task Progress"
//                             />
//                             <select
//                                 value={projectId}
//                                 onChange={(e) => setProjectId(e.target.value)}
//                             >
//                                 <option value="">Select Project</option>
//                                 {projects.map(project => (
//                                 <option key={project._id} value={project._id}>
//                                     {project.title}
//                                 </option>
//                                 ))}
//                             </select>
//                             <div className="labels-section">
//                                 <input 
//                                     type='text'
//                                     value={newLabel}
//                                     onChange={(e) => setNewLabel(e.target.value)}
//                                     placeholder="Add a label"
//                                 />
//                                 <button onClick={handleAddLabel}>Add Label</button>
//                             </div>
//                         </div>
//                         <button className="submit-button" type="submit">Edit</button>
//                     </form>
//                 )}
//                 </div>
//         </div>

<div className="dashboard-container">
    <div className="sidebardash">
        <h2>Dashboard</h2>
        <ul>
            <li onClick={gotoProjects}>Projects</li>
            <li onClick={gotoAccount}>My Account</li>
            <li onClick={handleSignOut}>Sign Out</li>
        </ul>
    </div>
    <div className="main-content">
        <nav className="navbar">
            <h1>Your Tasks</h1>
        </nav>
        <div className="filter-section">
            <label>Filter by Label:</label>
            <select value={filterLabel} onChange={(e) => setFilterLabel(e.target.value)}>
                <option value="">All</option>
                {Array.from(new Set(tasks.flatMap(task => task.labels))).map((label, index) => (
                    <option key={index} value={label}>{label}</option>
                ))}
            </select>
        </div>

        <div className="task-list">
            {tasks && (
                filterTasksByLabel().map((task, index) => (
                    <div className="task-card" key={index}>
                        <div className="task-header">
                            <h4>{task.title}</h4>
                            <div className="task-actions">
                                <button className="delete-btn" onClick={() => handleTaskDelete(task._id)}>Delete</button>
                                <button className="edit-btn" onClick={() => { 
                                    setIsEditing(true); 
                                    setEditingTaskId(task._id); 
                                    setTaskEditing(task); 
                                    setLabels(task.labels); 
                                }}>Edit</button>
                            </div>
                        </div>
                        <div className="task-details">
                            <p>Description: {task.description}</p>
                            <p>Progress: {task.progress}%</p>
                            <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                            {task.labels && task.labels.length > 0 && (
                                <div className="task-labels">
                                    Labels: 
                                    {task.labels.map((label, index) => (
                                        <span key={index} className="task-label">
                                            {label}
                                            <button className="remove-label-btn" onClick={() => handleRemoveLabel(label, task)}>x</button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
    <div className='form-container'>
        {!editingTaskId && (
            <form className="task-form create-task-form" onSubmit={handleSubmit}>
                <h2>Create New Task</h2>
                <div className="form-group">
                    <input
                        type="text"
                        value={titleTask}
                        onChange={(e) => setTitleTask(e.target.value)}
                        placeholder="Task Title"
                    />
                    <input
                        type="text"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder="Task Description"
                    />
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    <label htmlFor='range'>Drag to select your current Progress</label>
                    <input
                        required type='range' id='range' min={0} max={100} name='progress'
                        value={taskProgress}
                        onChange={(e) => setTaskProgress(Number(e.target.value))}
                    />
                    <select
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                    >
                        <option value="">Select Project</option>
                        {projects.map(project => (
                            <option key={project._id} value={project._id}>
                                {project.title}
                            </option>
                        ))}
                    </select>
                    <div className="labels-section">
                        <input 
                            type='text'
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            placeholder="Add a label"
                        />
                        <button type="button" onClick={handleAddLabel}>Add Label</button>
                    </div>
                </div>
                <button className="submit-button" type="submit">Create Task</button>
            </form>
        )}

        {editingTaskId && (
            <form className="task-form edit-task-form" onSubmit={(e) => handleEditTask(e, editingTaskId)}>
                <h2>Edit Task Here</h2>
                <div className="form-group">
                    <input
                        type="text"
                        value={titleTask || taskEditing?.title || ''}
                        onChange={(e) => setTitleTask(e.target.value)}
                        placeholder="Task Title"
                    />
                    <input
                        type="text"
                        value={taskDescription || taskEditing?.description || ''}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder="Task Description"
                    />
                    <input
                        type="date"
                        value={deadline || taskEditing?.deadline?.split('T')[0] || ''}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    <label htmlFor='range'>Drag to select your current Progress</label>
                    <input
                        required type='range' id='range' min={0} max={100} name='progress'
                        value={taskProgress || taskEditing?.progress || 0}
                        onChange={(e) => setTaskProgress(Number(e.target.value))}
                    />
                    <select
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                    >
                        <option value="">Select Project</option>
                        {projects.map(project => (
                            <option key={project._id} value={project._id}>
                                {project.title}
                            </option>
                        ))}
                    </select>
                    <div className="labels-section">
                        <input 
                            type='text'
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            placeholder="Add a label"
                        />
                        <button type="button" className="add-label-btn" onClick={handleAddLabel}>Add Label</button>
                    </div>
                </div>
                <button className="submit-button" type="submit">Edit</button>
            </form>
        )}
    </div>
</div>

    );
};

export default DashBoard;
