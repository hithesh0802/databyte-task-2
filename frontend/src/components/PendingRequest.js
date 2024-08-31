import React, { useEffect, useState } from 'react';
import { fetchPendingRequests, handleRequest } from '../context/api'; 
import axios from 'axios';
import '../styling/pendingreq.css';

const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const API_URL = 'http://localhost:5000/api';
  const [curruser,setCurruser]= useState([]);

  const getPendingRequests = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/getrequests`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPendingRequests(response.data.requests);
      console.log(response.data.requests);
    } catch (error) {
      console.error('Error fetching collaborator requests:', error);
    }
  }

  useEffect(() => {
    getPendingRequests();
  }, [])

  const acceptRequest = async (projectId, res) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/users/accept-request`, { projectId, res }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const response= await axios.post(`${API_URL}/projects/addCollaborator`, { projectId, res }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response.data);
      alert('Request accepted/rejected');
      getPendingRequests();
    } catch (error) {
      console.log('Error accepting/rejecting response', error);
    }
  };

  return (
    // <div className="pending-requests-container">
    //   <h2 className="section-heading">Pending Requests</h2>
    //   <ul className="requests-list">
    //     {pendingRequests.length > 0 ? (
    //       pendingRequests.map(request => (
    //         <li key={request.projectId} className="request-card">
    //           <h3 className="request-title">Project: {request.projectName}</h3>
    //           <p className="request-description">Desc: {request.projectDescription}</p>
    //           <div className="request-buttons">
    //             <button onClick={() => acceptRequest(request.projectId, 'accept')} className="accept-button">
    //               Accept
    //             </button>
    //             <button onClick={() => acceptRequest(request.projectId, 'reject')} className="reject-button">
    //               Reject
    //             </button>
    //           </div>
    //         </li>
    //       ))
    //     ) : (
    //       <p className="no-requests">No pending requests</p>
    //     )}
    //   </ul>
    // </div>

    <div className="pending-requests-container">
  <h2 className="section-heading">Pending Requests</h2>
  <ul className="requests-list">
    {pendingRequests.length > 0 ? (
      pendingRequests.map(request => (
        <li key={request.projectId} className="request-card">
          <h3 className="request-title">Project: {request.projectName}</h3>
          <p className="request-description">Desc: {request.projectDescription}</p>
          <div className="request-buttons">
            <button onClick={() => acceptRequest(request.projectId, 'accept')} className="accept-button">
              Accept
            </button>
            <button onClick={() => acceptRequest(request.projectId, 'reject')} className="reject-button">
              Reject
            </button>
          </div>
        </li>
      ))
    ) : (
      <p className="no-requests">No pending requests</p>
    )}
  </ul>
</div>

  );
};

export default PendingRequests;

