import React, { useState } from 'react'
import '../index.css' ;
import TickIcon from './TickIcon';
import ProgressBar from './ProgressBar';
import Modal from './Modal';

const ListItem = ({task}) => {
    const[showModal,setShowModal]= useState(false);

  return (
      <li className="list-item" key={task._id}>
            <div className="info-container">
                <TickIcon />
                <p className='task-title'>{task.title}</p>
                {/* <div className="dashboard-task-actions">
                    <button className="dashboard-task-button delete" onClick={() => handleTaskDelete(task._id)}>Delete</button>
                    <button className="dashboard-task-button edit" onClick={() => { setIsEditing(true); setEditingTaskId(task._id); setTaskEditing(task); }}>Edit</button>
                </div> */}
                <ProgressBar />
            </div>
            <div className='button-container'>
                    <button className='edit'onClick={()=>setShowModal(true)}>EDIT</button>
                    <button className='delete'>DELETE</button>
            </div>
            {showModal && <Modal mode={"edit"} setShowModal={setShowModal} task={task}></Modal>}
      </li>
  )
}

export default ListItem
