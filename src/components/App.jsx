import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import RequestPasswordReset from './RequestPasswordReset';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard';
import Rewards from './Rewards';
import { UserContext } from './components/UserContext';

function App() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
      <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/request" element={<RequestPasswordReset />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rewards" element={<Rewards />} />
        </Routes>
      </Router>
      </UserContext.Provider>
  );
}

export default App;

