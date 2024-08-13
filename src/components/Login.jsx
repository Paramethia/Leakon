import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Header = () => {
    return ( 
        <Helmet>
            <title> Invicon - login </title>
        </Helmet>
    );
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('https://invicon-back-end.onrender.com/login', { email, password })
            .then(result => {
                console.log('Server response:', result);
                if (result.data === "Success") {
                    navigate('/home');
                } else {
                    toast.error('Incorrect password or email. Try again.', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                }
            })
            .catch(err => {
                console.error('Login error:', err);
                toast.error('Login failed. Please try again later.');
            }
        );
    }

    return (
        <>
    
        <Header />

        <ToastContainer />

        <div className="flex  h-screen">
            <div className="hidden md:block md:w-1/2 bg-auto" style={{ backgroundImage: 'url(https://res.cloudinary.com/dw7w2at8k/image/upload/v1720626946/Home_1_d6rirw.png)' }}></div>
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-100">
                <h1 className="block md:hidden mb-6 text-4xl font-bold text-dark">Invicon</h1>
                <div className="bg-white p-8 rounded shadow-md w-3/4 animate__animated animate__fadeInRight">
                    <h3 className="mb-6 text-2xl font-bold  text-dark">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 text-left">
                            <label htmlFor="exampleInputEmail1" className="block text-sm font-bold mb-2">
                                Email Id
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="exampleInputEmail1"
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6 text-left">
                            <label htmlFor="exampleInputPassword1" className="block text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="exampleInputPassword1"
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-dark text-white py-2 rounded-md hover:bg-dark transition duration-300 ease-in-out transform hover:scale-105"> Login </button>
                    </form>
                   
                  
                 <p className="my-4  flex">Don't have an account? <Link to='/register' className='text-dark mx-2'> Register< /Link> </p>   <p className="my-4"> </p>
                  <p><Link to='/request' className='text-dark'>I forgot the Password</Link></p>
                       
                </div>
            </div>           
        </div>
        </>
    );
}

export default Login;
