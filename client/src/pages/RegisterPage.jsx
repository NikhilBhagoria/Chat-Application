import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', nativeLanguage: '', targetLanguage: '', proficiency: '', bio: '' });
  const navigate = useNavigate();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/users/register', form);
    navigate('/login');
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br/>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br/>
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} /><br/>
      <input name="nativeLanguage" placeholder="Native Language" value={form.nativeLanguage} onChange={handleChange} /><br/>
      <input name="targetLanguage" placeholder="Target Language" value={form.targetLanguage} onChange={handleChange} /><br/>
      <input name="proficiency" placeholder="Proficiency" value={form.proficiency} onChange={handleChange} /><br/>
      <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} /><br/>
      <button type="submit">Register</button>
    </form>
  );
}
export default RegisterPage;