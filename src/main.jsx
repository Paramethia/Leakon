import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import UserProvider from './components/UserContext';
import Footer from './components/Footer';


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <React.StrictMode>
      <App />
      {/* <Footer /> */}
    </React.StrictMode>
  </UserProvider>
)
