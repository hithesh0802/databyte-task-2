import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import '../styling/search.css';

const SearchUsers = ({ projectId }) => {
  const [username, setUsername] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const API_URL = 'http://localhost:5000/api';
  const [currUser, setCurrUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const getData = async () => {
      const response = await axios.get(`${API_URL}/users/getdetails`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      setCurrUser(response.data);
    }
    getData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${API_URL}/users/search`, { q: username }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setSearchResult(response.data.users);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };

  const sendRequest = async (recipientId) => {
    try {
      if (!currUser) return;
      const token = localStorage.getItem("token");
      const result= await axios.post(`${API_URL}/users/send-request`, {
        projectId: projectId,
        userId: recipientId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      console.log(result);
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  }

  return (
    // <div className="search-users-container">
    //   <form onSubmit={handleSearch} className="search-form">
    //     <input
    //       type="text"
    //       placeholder="Search for Users..."
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       required
    //       className="search-input"
    //     />
    //     <button type="submit" className="search-button">
    //     <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="M0 0h24v24H0z"/><path fill="currentColor" d="M10.5 2a8.5 8.5 0 0 1 6.676 13.762l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 1 1 10.5 2m0 2a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13m0 1a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11"/></g></svg>
    //     </button>
    //   </form>
    //   <div className="search-results">
    //     {searchResult === null ? (
    //       <p className="search-info">Please search for users.</p>
    //     ) : searchResult.length > 0 ? (
    //       searchResult.map(user => (
    //         <div key={user._id} className="friend-card">
    //           <p className="friend-username">{user.username}</p>
    //           <button onClick={() => sendRequest(user._id)} className="send-request-button">Send Request</button>
    //         </div>
    //       ))
    //     ) : (
    //       <p className="search-info">No Users found.</p>
    //     )}
    //   </div>
    // </div>

    <div className="search-users-container">
  <form onSubmit={handleSearch} className="search-form">
    <input
      type="text"
      placeholder="Search for Users..."
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
      className="search-input"
    />
    <button type="submit" className="search-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <g fill="none">
          <path d="M0 0h24v24H0z"/>
          <path fill="currentColor" d="M10.5 2a8.5 8.5 0 0 1 6.676 13.762l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 1 1 10.5 2m0 2a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13m0 1a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11"/>
        </g>
      </svg>
    </button>
  </form>
  <div className="search-results">
    {searchResult === null ? (
      <p className="search-info">Please search for users.</p>
    ) : searchResult.length > 0 ? (
      searchResult.map(user => (
        <div key={user._id} className="friend-card">
          <p className="friend-username">{user.username}</p>
          <button onClick={() => sendRequest(user._id)} className="send-request-button">Send Request</button>
        </div>
      ))
    ) : (
      <p className="search-info">No Users found.</p>
    )}
  </div>
</div>

  );
};

export default SearchUsers;