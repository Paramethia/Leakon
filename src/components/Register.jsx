import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { useState, useContext } from 'react';
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { toast, ToastContainer, Bounce, Flip, Slide } from 'react-toastify';
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
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let usedInvite = searchParams.get('inviteId');
    const {username, setName} = useContext(UserContext);
    const {email, setEmail} =  useContext(UserContext);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // To check if the user already has an account on the device to prevent inviting multiple acccount on the same device.

    let alreadyReg = localStorage.getItem("email");

    const handleRegister = (event) => {
        event.preventDefault();
    
        axios.post('https://invicon-back-end.onrender.com/register', { username, email, password, usedInvite })
        .then(result => {
            if (result.data === "Account already registered.") {
                 toast.warn("Already registered, pal. Go log in", {
                    position: "top-center",
                    autoClose: 4400,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                });
                setTimeout(() => {
                    navigate('/login');
                }, 4400);
            } else if (result.data === "Registered.") {
               if (usedInvite != null && alreadyReg) {
                    toast.warn("You cannot use invite links if you already registered on this device.", {
                        position: "top-center",
                        autoClose: 5200,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Flip,
                    });
                    setTimeout(() => {
                        navigate('/login');
                    }, 5500);
               } else {
                    localStorage.setItem('usedInvite', usedInvite);
                    localStorage.setItem("username", username);
                    localStorage.setItem("email", email);
                    navigate('/home');
               }
            }

        })
        .catch(err => {
            console.log(err);
            toast.error("Registration failed. Please try again later.", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        });
    }

    function clearCache() {
        localStorage.clear();
    }

    return (
        <>
        
        <Header />

        <ToastContainer />

        <div className="flex h-screen overflow-hidden">
            <div className="hidden md:block md:w-1/2 bg-auto" style={{ backgroundImage: 'url(https://res.cloudinary.com/doxalk3ms/image/upload/v1723931827/Invicon_register_or_log_in_image_xfeg1y.png)' }}></div>
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-100">
                <h1 className="block md:hidden mb-6 text-4xl font-bold text-dark">Invicon</h1>
                <div className="bg-white p-8 rounded shadow-md w-3/4 animate__animated animate__fadeInRight">
                    <h3 className="mb-6 text-2xl font-bold text-dark">Register</h3>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4 text-left">
                            <label htmlFor="exampleInputName" className="block text-sm font-bold mb-2">
                                Username:
                            </label>
                            <input
                                type="text"
                                maxlength="12"
                                placeholder="Create username"
                                className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="exampleInputName"
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4 text-left">
                            <label htmlFor="exampleInputEmai1" className="block text-sm font-bold mb-2">
                                Email:
                            </label>
                            <input
                                type="email"
                                maxlength="35"
                                placeholder="Enter email"
                                className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="exampleInputEmail1"
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6 text-left">
                            <label htmlFor="exampleInputPassword1" className="block text-sm font-bold mb-2">
                                Password:
                            </label>
                            <input
                                type="password"
                                maxlength="14"
                                placeholder="Create password"
                                className="form-control block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                id="exampleInputPassword1"
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-dark text-white py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"> Submit </button>
                    </form>
                    <p className="my-4 mx-2">Already have an account? <Link to='/login' className='text-dark'>Log in</Link></p>
                    {/* <button onClick={clearCache} className="w-full bg-dark text-white py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"> Clear cache </button> */}
                </div>
            </div>
        </div>

        </>
    );
}

export default Register;
