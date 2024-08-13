import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Flip, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

const Header = () => {
    return ( 
        <Helmet>
            <title> Invicon - register </title>
        </Helmet>
    );
};

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();

        axios.post('https://invicon-back-end.onrender.com/register', { email, password })
            .then(result => {
                if (result.data === "Account has already been registered. Please log in.") {
                    toast.warn("Already registered, pal. Go log in", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Flip,
                    });
                    navigate('/login');
                } else {
                    toast.info("Welcome to Invicon 😉", {
                        position: "top-right",
                        autoClose: 3500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Slide,
                    });
                    navigate('/home');
                }
            })
            .catch(err => console.log(err));
        }
    
    return (
        <>
        
        <Header />

        <ToastContainer />

        <div className="flex h-screen overflow-hidden">
            <div className="hidden md:block md:w-1/2 bg-auto" style={{ backgroundImage: 'url(https://res.cloudinary.com/dw7w2at8k/image/upload/v1720626946/Home_1_d6rirw.png)' }}></div>
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-100">
                <h1 className="block md:hidden mb-6 text-4xl font-bold text-dark">Invicon</h1>
                <div className="bg-white p-8 rounded shadow-md w-3/4 animate__animated animate__fadeInRight">
                    <h3 className="mb-6 text-2xl font-bold text-dark">Register</h3>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4 text-left">
                            <label htmlFor="exampleInputName" className="block text-sm font-bold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="exampleInputName"
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>
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
                                placeholder="Create password"
                                className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="exampleInputPassword1"
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-dark text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">Register</button>
                    </form>
                    <p className="my-4 mx-2">Already have an account? <Link to='/login' className='text-dark'>Login</Link></p>
                </div>
            </div>
        </div>
        </>
    );
}

export default Register;
