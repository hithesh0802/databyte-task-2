import React, { useState } from 'react'

const Modal = ({mode,setShowModal,task}) => {
    const editMode= mode=== "edit"? true: false;
    const [data,setData]= useState({
        title: editMode? task.title: null,
        progress:editMode? task.progress :50,
        deadline: editMode?"": new Date(),
        description: editMode? task.description : null
    })
    const handleChange=(e)=>{
        const {name,value} =e.target;
        setData((data)=> ({
            ...data,
            [name]: value
        }))

        console.log(data);
    }

  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='form-title-container'>
            <h3>Let's {mode} Your Task!</h3>
            <button onClick={()=> setShowModal(false)}>X</button>
        </div>

        <form>
            <input required maxLength={30} placeholder='Your Task goes here' name='title' value={data.title} onChange={handleChange} />
            <br/>
            <label for='range'>Drag to select your current Progress</label>
            <input required type='range' id='range' min={0} max={100} name='progress' value={data.progress} onChange={handleChange}/>
            <input className={mode} type='submit' />
        </form>
      </div>
    </div>
  )
}

export default Modal
