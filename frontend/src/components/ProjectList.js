import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../context/api'; 
import CreateProject from '../pages/CreateProject';
import '../styling/projectlist.css';
import { io } from 'socket.io-client';
import SearchUsers from './Search';
import PendingRequests from './PendingRequest';
import SingleProject from './SingleProject';

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);
//   // const socket = io('http://localhost:5000'); 

//   const getProjects = async () => {
//     const results = await fetchProjects();
//     setProjects(results.projects);
//   };

//   useEffect(() => {
//     getProjects();
//   }, );
//     // projects.forEach(project => {
//     //   socket.emit('joinProjectRoom', { projectId: project._id });

//     //   socket.on('taskUpdated', data => {
//     //     setProjects(prevProjects => prevProjects.map(p => 
//     //       p._id === data.task.project ? {...p, tasks: p.tasks.map(t => t._id === data.task._id ? data.task : t)} : p
//     //     ));
//     //   });

//     //   socket.on('taskCreated', data => {
//     //     setProjects(prevProjects => prevProjects.map(p => 
//     //       p._id === data.task.project ? {...p, tasks: [...p.tasks, data.task]} : p
//     //     ));
//     //   });

//     //   socket.on('taskDeleted', data => {
//     //     setProjects(prevProjects => prevProjects.map(p => 
//     //       p._id === data.projectId ? {...p, tasks: p.tasks.filter(t => t._id !== data.taskId)} : p
//     //     ));
//     //   });
//     // });

//     // return () => {
//     //   projects.forEach(project => {
//     //     socket.emit('leaveProjectRoom', { projectId: project._id });
//     //   });
//     //   socket.disconnect();
//     // };
//     //[projects, socket]
  

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject,setSelectedProject]= useState(null);

  const getProjects = async () => {
    const results = await fetchProjects(); 
    setProjects(results.projects);
  };

  useEffect(() => {
    getProjects();
  }, []);

  if(selectedProject){
    return <SingleProject project={selectedProject} />
  }

  return (
    // <div className="project-list-page">
    //   <header className="header-section">
    //     <h1 className="main-heading">My Projects</h1>  
    //   </header>
    //   <div className="content-container">
    //     <aside className="sidebar">
    //       <PendingRequests />
    //       <CreateProject />
    //     </aside>
    //     <main className="projects-container">
    //       {projects.length > 0 ? (
    //         projects.map(project => (
    //           <div className="project-card" key={project._id} >
    //             <h2 className="project-title">{project.title}</h2>
    //             <p className="project-description">{project.description}</p>
    //             <div className="tasks-section">
    //               <h3 className="task-heading">Tasks</h3>
    //               <ul className="task-list">
    //                 {project.tasks.map(task => (
    //                   <li className="task-item" key={task._id}>
    //                     <strong className="task-title">{task.title}</strong> - {task.description}
    //                   </li>
    //                 ))}
    //               </ul>
    //             </div>
    //             <div className="collaborators-section">
    //               <h3 className="collaborator-heading">Add Collaborator</h3>
    //               <SearchUsers projectId={project._id} />
    //             </div>
    //             <button className="btnview" onClick={()=> setSelectedProject(project)}>View More</button>
    //           </div>
    //         ))
    //       ) : (
    //         <p className="no-projects-message">No projects found. Create a new project to get started!</p>
    //       )}
    //     </main>
    //   </div>
    // </div>

    <div className="project-list-page">
  <header className="header-section">
    <h1 className="main-heading">My Projects</h1>  
  </header>
  <div className="content-container">
    <aside className="sidebar">
      <div style={{marginBottom: "20px"}}><PendingRequests /></div>
      <CreateProject />
    </aside>
    <main className="projects-container">
      {projects.length > 0 ? (
        projects.map(project => (
          <div className="project-card" key={project._id}>
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
            <div className="tasks-section">
              <h3 className="task-heading">Tasks</h3>
              <ul className="task-list">
                {project.tasks.map(task => (
                  <li className="task-item" key={task._id}>
                    <strong className="task-title">{task.title}</strong> - {task.description}
                  </li>
                ))}
              </ul>
            </div>
            <div className="collaborators-section">
              <h3 className="collaborator-heading">Add Collaborator</h3>
              <SearchUsers projectId={project._id} />
            </div>
            <button className="btnview" onClick={() => setSelectedProject(project)}>View More</button>
          </div>
        ))
      ) : (
        <p className="no-projects-message">No projects found. Create a new project to get started!</p>
      )}
    </main>
  </div>
</div>

  );
};

export default ProjectList;