import React, { useState } from 'react';
import axios from 'axios';

const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://invicon-server.onrender.com/request-password-reset', { email });
      setMessage('Password reset email sent');
    } catch (error) {
      setMessage('Error sending password reset email');
    }
  };

  return (

    <div className="flex  h-screen">
                <div className="hidden md:block md:w-1/2 bg-auto" style={{ backgroundImage: 'url(https://res.cloudinary.com/dw7w2at8k/image/upload/v1720626946/Home_1_d6rirw.png)' }}></div>
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-100">
                <h1 className="block md:hidden mb-6 text-4xl font-bold text-dark">Invicon</h1>
                <div className="bg-white p-8 rounded shadow-md w-3/4 animate__animated animate__fadeInRight">
    <h3 className="mb-6 text-2xl text-center font-bold  text-dark">Reset password</h3>

      
      <form onSubmit={handleSubmit}>
      <div className="mb-4 text-left">

        <input
          type="email"
          placeholder="Enter your email"
          className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <button type="submit" className="w-full bg-dark text-white py-2 rounded-md hover:bg-dark transition duration-300 ease-in-out transform hover:scale-105">Send Reset Email</button>
      </form>
      {message && <h5 className='text-center pt-4'>{message}</h5>}
    </div>
    </div>
    </div>
  );
};

export default RequestPasswordReset;
