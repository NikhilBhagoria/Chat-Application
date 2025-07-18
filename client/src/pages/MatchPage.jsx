import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function MatchPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data));
  }, []);

  const startSession = (userId) => {
    axios.post('http://localhost:5000/api/sessions', {
      userA: localStorage.getItem('userId'),
      userB: userId,
      language: "English",
      scheduledAt: new Date(),
    }).then(res => {
      navigate(`/video/${res.data._id}`);
    });
  };

  return (
    <div>
      <h2>Find a Language Partner</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.name} ({u.nativeLanguage} → {u.targetLanguage}) 
            <button onClick={() => startSession(u._id)}>Start Session</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default MatchPage;