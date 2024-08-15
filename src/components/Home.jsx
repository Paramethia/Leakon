import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiHome as HomeIcon, FiGift as GiftIcon, FiUsers as UsersIcon, FiCopy as CopyIcon } from 'react-icons/fi';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import './Extra styles.css';

const Header = () => {
    return ( 
        <Helmet>
            <title> Invicon - home </title>
            <meta name="description" content="Welcome to Invicon" />
        </Helmet>
    );
};

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Sidebar = ({ isOpen, toggleSidebar }) => {

    const handleCopyReferralCode = () => {
        navigator.clipboard.writeText("No");
        toast.success('Copied to clipboard! 🗒️', {
           position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
        });
    };

    return (
        <>

        <ToastContainer />

        <aside className={`w-64 bg-[#282434] text-white flex flex-col p-6 transition-transform transform ${ isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:block fixed z-40 top-0 bottom-0`} style={{ backgroundColor: "#282434" }}>
            <div className="flex static justify-between items-center mb-6">
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <div className="text-white flex items-center gap-2">
                        <img src="https://res.cloudinary.com/dw7w2at8k/image/upload/v1721763323/00f6d818-53e4-43fd-819d-1efb5932af3c-removebg-preview_jwgmzt.png" alt="Invicon Logo" className="w-8 h-8"/>
                        <h1 className="text-xl font-bold mt-2 font-helvetica">Invicon</h1>
                    </div>
                </Link>
                <button className="md:hidden" onClick={toggleSidebar}>
                    <FaTimes className="h-6 w-6 text-white" />
                </button>
            </div>

            <nav className="flex flex-col gap-2 mb-10">
                <Link to="/home" className="flex items-center text-white gap-2 rounded-md px-3 py-2 text-sm font-medium font-helvetica transition-colors H-effect" style={{ textDecoration: 'underline' }}>
                    <HomeIcon className="h-4 w-4" /> Home 
                </Link>
                <Link to="/dashboard" className="flex text-white items-center gap-2 rounded-md px-3 py-2 text-sm font-medium font-helvetica transition-colors H-effect" style={{ textDecoration: 'none' }}>
                    <UsersIcon className="h-4 w-4" /> Invitations
                </Link>
                <Link to="/rewards" className="flex items-center text-white  gap-2 rounded-md px-3 py-2 text-sm font-medium font-helvetica transition-colors H-effect" style={{ textDecoration: 'none' }}>
                    <GiftIcon className="h-4 w-4" /> Rewards
                </Link>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 grid gap-4 rounded-lg bg-[#282434] p-4">
                <div className="grid gap-1">
                    <h3 className="text-sm font-bold font-helvetica">Your Referral Code</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium font-helvetica">ABC123</span>
                        <button className="bg-transparent p-2 rounded-full" onClick={handleCopyReferralCode}>
                            <CopyIcon className="h-4 w-4 H-effect" />
                        </button>
                    </div>
                </div>
            </div>
        </aside>
        </>
    );
};

const InviteLinkComponent = () => {

    const [inviteLink, setInviteLink] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
       const existingLink = localStorage.getItem('inviteLink');
       if (existingLink) {
            setInviteLink(existingLink);
       } else {
           const fetchInviteLink = async () => {
             try {
                const response = await axios.post('https://invicon-back-end.onrender.com/generate-invite', { email: 'user@example.com' });
                setInviteLink(response.data.inviteLink);
                localStorage.setItem('inviteLink', response.data.inviteLink);
            } catch (error) {
                    setError('Error generating invite link');
                    console.error('Error generating invite link:', error);
            }
        };
    
        fetchInviteLink();
      }
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteLink);
        toast.success('Copied to clipboard! 🗒️', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
        });
    };

    return (
        <>

        <Header />
        
        <ToastContainer />

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Your Invite Link</h2>
                <p className="text-gray-500 dark:text-gray-400">Share this link with your friends to earn rewards.</p>
            </div>
            <div className="flex items-center justify-between">
                {error && <p className="text-red-500">{error}</p>}
                {!error && (
                    <>
                        <div className="bg-gray-200 dark:bg-gray-800 rounded-md px-4 py-2 text-lg font-medium text-gray-700 dark:text-white">
                            {inviteLink}
                        </div>
                        <button className="bg-gray-300 hover:bg-blue-500 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md" onClick={handleCopy}>
                            Copy
                        </button>
                    </>
                )}
            </div>
        </div>
        </>
    );
};

let InviteHandler = () => {
    const query = useQuery();
    const inviteId = query.get('inviteId');
    const usedBy = 'newUser@example.com';

    useEffect(() => {
        const useInvite = async () => {
            try {
                const response = await axios.get(`https://invicon-back-end.onrender.com/invite/${inviteId}`, { params: { usedBy } });
                console.log(response.data);
                window.location.href = "/register";
            } catch (err) {
                console.error(err.response.data);
            }
        };

        if (inviteId) {
            useInvite();
        }
    }, [inviteId]);

};

const Component = () => {
    const inviteLink = useState('');

    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [inviteData, setInviteData] = useState({ invites: 0, tier: 0 });

    const darkModeStyles = { backgroundColor: '#101424' };
    const lightModeStyles = { backgroundColor: '#ffffff' };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchInviteData = async () => {
            try {
                const response = await axios.get('https://invicon-back-end.onrender.com/invite-data', { params: { email: 'user@example.com' } }); // Replace with dynamic email
                setInviteData(response.data);
            } catch (error) {
                console.error('Error fetching invite data', error);
            }
        };

        fetchInviteData();
    }, []);

    return (
        <div className="flex">

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} inviteLink={inviteLink} />

            <main className="flex-1 p-8 space-y-6" style={isDarkMode ? darkModeStyles : lightModeStyles}>
                <div
                    className="flex relative px-3 mb-5 items-center justify-between md:justify-start"
                    style={{
                        backgroundColor: isDarkMode ? '#282434' : '#F5F5F5',
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        zIndex: 40,
                    }}
                >
                    <div className="flex items-center">
                        <button className="mr-5 md:hidden" onClick={toggleSidebar}>
                            <FaBars className="h-6 w-6 text-white" />
                        </button>
                        <Link to="/home">
                            <img
                                src="https://res.cloudinary.com/dw7w2at8k/image/upload/v1721763323/00f6d818-53e4-43fd-819d-1efb5932af3c-removebg-preview_jwgmzt.png"
                                alt="Invicon Logo"
                                className="w-12 h-12"
                            />
                        </Link>
                    </div>
                    <button className="text-white ml-auto md:ml-0" onClick={toggleTheme}>
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
                <section>
                    <h2 className={`text-3xl pt-6 pb-4 font-semibold text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Welcome to Invicon!</h2>
                    <div className="flex justify-center">
                        <div className={`bg-[#282434] text-white p-6 rounded-lg`}>
                            <h3 className="text-xl font-bold">Invites: {inviteData.invites}</h3>
                            <p className="text-lg">Tier: {inviteData.tier}</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

const Home = () => (
    <>
        <InviteLinkComponent />
        <Component />
        <InviteHandler />
    </>
);

export default Home;
