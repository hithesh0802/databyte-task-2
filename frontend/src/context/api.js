import axios from 'axios';

const API_URL = 'https://databyte-task-2-1.onrender.com' ;

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  };
  
export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

export const fetchTasks = async(token) =>{
    const response = await axios.get(`${API_URL}/tasks/getTasks`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
    });
    return response.data;
}

export const createTask = async({token,title,description,deadline,progress,project,labels}) =>{
    let body= {title ,description,deadline,progress,project,labels};
    console.log(token,body);
    const response = await axios.post(`${API_URL}/tasks/createTasks`,body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
    });
    return response.data;
}

export const createProject = async({title,description}) =>{
    const token=localStorage.getItem("token");
    // console.log(`${API_URL}/projects/createProject`,{title,description});
    const response = await axios.post(`${API_URL}/projects/createProject`,{title,description}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
    });
    return response.data;
}

export const deleteTask = async(token,id)=>{
    const response = await axios.post(`${API_URL}/tasks/deleteTask`,{id}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
    });
    return response.data;
}

export const editingTask= async(token,{taskId,titleTask, taskDescription, deadline, taskProgress,labels ,projectId})=>{
    const response = await axios.post(`${API_URL}/tasks/editTask`,{taskId,titleTask, taskDescription, deadline, taskProgress,labels,projectId }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
    });
    return response.data;
}

export const deleteLabel = async(token,id,labelToRemove)=>{
    const response = await axios.post(`${API_URL}/tasks/deleteLabel`,{id,labelToRemove}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
    });
    return response.data;
}

export const fetchProjects = async()=>{
    const token= localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/projects/getProjects`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
    });
    return response.data;
}
