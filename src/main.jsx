import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
// import { UserContext } from './components/UserContext';
import Footer from './components/Footer';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <UserContext.Provider value={{ user, setUser }}> */}
      <App />
      {/* <Footer /> */}
    {/* </UserProvider> */}
  </React.StrictMode>
)
