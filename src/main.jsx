import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import UserProvider from './components/UserContext';
import Footer from './components/Footer';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
      {/* <Footer /> */}
    </UserProvider>
  </React.StrictMode>
)
