import React, { useState } from 'react';
import { createProject } from '../context/api'; 
import '../styling/projectform.css';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createProject({ title, description });
      console.log(result);
    } catch (error) {
      console.error('Failed to create project:', error.message);
    }
  };

  return (
    // <form className="project-form" onSubmit={handleSubmit}>
    //   <h2 className="form-heading">Create a New Project</h2>
    //   <div className="form-group">
    //     <label htmlFor="title">Project Title</label>
    //     <input
    //       id="title"
    //       type="text"
    //       value={title}
    //       onChange={(e) => setTitle(e.target.value)}
    //       placeholder="Enter project title"
    //       className="form-input"
    //       required
    //     />
    //   </div>
    //   <div className="form-group">
    //     <label htmlFor="description">Project Description</label>
    //     <textarea
    //       id="description"
    //       value={description}
    //       onChange={(e) => setDescription(e.target.value)}
    //       placeholder="Enter project description"
    //       className="form-input textarea"
    //       required
    //     />
    //   </div>
    //   <button type="submit" className="submit-button">Create Project</button>
    // </form>

    <form className="project-form" onSubmit={handleSubmit}>
  <h2 className="form-heading">Create a New Project</h2>
  <div className="form-group">
    <label htmlFor="title">Project Title</label>
    <input
      id="title"
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Enter project title"
      className="form-input"
      required
    />
  </div>
  <div className="form-group">
    <label htmlFor="description">Project Description</label>
    <textarea
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Enter project description"
      className="form-input textarea"
      required
    />
  </div>
  <button type="submit" className="submit-button">Create Project</button>
</form>

  );
};

export default CreateProject;
