import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
    if (res.data.user) {
      localStorage.setItem('userId', res.data.user._id);
      navigate('/match');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button type="submit">Login</button>
    </form>
  );
}
export default LoginPage;