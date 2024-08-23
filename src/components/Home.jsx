import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiHome as HomeIcon, FiGift as GiftIcon, FiUsers as UsersIcon, FiMail as ConIcon, FiCopy as CopyIcon } from 'react-icons/fi';
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

const Sidebar = ({ isOpen, toggleSidebar }) => {
    let inviteLink = localStorage.getItem('inviteLink');
    let code = "ABC123";
    if (inviteLink) code = inviteLink.slice(-8);

    const handleCopyReferralCode = () => {
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

        <aside
          className={`w-64 bg-[#282434] text-white flex flex-col p-6 transition-transform transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:relative md:block fixed z-40 top-0 bottom-0`}
          style={{ backgroundColor: "#282434" }}
        >
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

            <nav className="Navigation flex flex-col gap-2 mb-10">
                <Link to="/home" className="flex items-center text-white gap-2 rounded-md px-3 py-2 font-helvetica transition-colors H-effect" style={{ textDecoration: 'underline' }}>
                    <HomeIcon className="h-4 w-4" /> Home
                </Link>
                <Link to="/dashboard" className="flex text-white items-center gap-2 rounded-md px-3 py-2 font-helvetica transition-colors H-effect" style={{ textDecoration: 'none' }}>
                    <UsersIcon className="h-4 w-4" /> Invitations
                </Link>
                <Link to="/rewards" className="flex items-center text-white  gap-2 rounded-md px-3 py-2 font-helvetica transition-colors H-effect" style={{ textDecoration: 'none' }}>
                    <GiftIcon className="h-4 w-4" /> Rewards
                </Link>
            </nav>
            
            <center>
                <div className="Contact">
                    <ConIcon className="h-4 w-4 inline" /> <a href="mailto:kevisbuffalo@gmail.com"> Contact dev </a>
                </div>
            </center>

            <div className="absolute bottom-0 left-0 right-0 grid gap-4 rounded-lg bg-[#282434] p-4">
                <div className="grid gap-1">
                    <h3 className="text-sm font-bold font-helvetica">Your Referral Code</h3>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium font-helvetica">{code}</span>
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
    const {username} = useContext(UserContext);

    useEffect(() => {
       const existingLink = localStorage.getItem('inviteLink');
       if (existingLink) {
            setInviteLink(existingLink);
       } else {
           const fetchInviteLink = async () => {
             try {
                const response = await axios.post('https://invicon-back-end.onrender.com/generate-invite', {username});
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

let InviteChecker = () => {
    const inviteId = localStorage.getItem("usedInvite");
    let {username} = useContext(UserContext);
    if (typeof inviteId === 'string') console.log("Your used the invite code:", inviteId)

    useEffect(() => {
        const check = async () => {
            try {
                const response = await axios.post(`https://invicon-back-end.onrender.com/invite-check`, {username, inviteId});
                if (response.data.message === "Invalid invite code.") { 
                    console.error( "Error:", response.data.message);
                } else if (response.data.message === "Code found and updated data.") {
                    console.log("Invite code found.");
                    localStorage.removeItem("usedInvite");
                }
            } catch (err) {
                console.error(err);
            }
        };

        if (typeof inviteId === 'string') {
            setTimeout(() => {
                check();
            }, 555);
        }
    }, [username]);

};

const Component = () => {
    const inviteLink = useState('');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [invites, setInvites] = useState();
    const [tier, setTier] = useState();
    let {username} = useContext(UserContext);
    const darkModeStyles = { backgroundColor: '#101424' };
    const lightModeStyles = { backgroundColor: '#ffffff' };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if (username) {
            const fetchInviteData = async () => {
                try {
                    const response = await axios.post('https://invicon-back-end.onrender.com/invite-data', {username});
                    setInvites(response.data.invites);
                    setTier(response.data.tier);
                } catch (error) {
                    console.error('Error fetching invite data', error);
                }
            };
            setTimeout(() => {
                fetchInviteData()
            }, 288);
        }
    }, [username]);

    return (
        <>

        <ToastContainer />
 
        <InviteChecker />

        <div className="flex">

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} inviteLink={inviteLink} />

            <main className="flex-1 p-8 space-y-6" style={isDarkMode ? darkModeStyles : lightModeStyles}>
                <div
                    className="flex relative px-3 mb-5 items-center justify-between md:justify-start"
                    style={{
                        backgroundColor: isDarkMode ? '#101424' : '#282434',
                        left: 0,
                        padding: '10px',
                        borderRadius: '5px',
                    }}
                >
                    <div className={`md:hidden fixed left-12 z-50 ${isSidebarOpen ? 'hidden' : ''}`}>
                        <button onClick={toggleSidebar}>
                            <FaBars className="h-6 w-6 text-white" />
                        </button>
                    </div>
                    <Link to="/home" style={{ textDecoration: 'none' }} className="flex-1 md:flex-none">
                        <div className="text-white flex items-center gap-2 justify-center md:justify-start">
                            <img src="https://res.cloudinary.com/dw7w2at8k/image/upload/v1721763323/00f6d818-53e4-43fd-819d-1efb5932af3c-removebg-preview_jwgmzt.png" alt="Invicon Logo" className="w-8 h-8" />
                            <h1 className="text-2xl font-bold font-helvetica">Invicon</h1>
                        </div>
                    </Link>
                    <div className="absolute top-4 right-4">
                        <label className="switch">
                            <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
                            <span className="slider round">
                                <span className="icon-container">
                                    {isDarkMode ? <FaSun color="#fff" /> : <FaMoon color="#333" />}
                                </span>
                            </span>
                        </label>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto mt-12">
                    <h1 className="text-3xl font-bold" style={{ color: isDarkMode ? '#ffffff' : '#1a202c' }}>
                        How it works
                    </h1>
                    <p className="text-gray-500" style={{ color: isDarkMode ? '#a0aec0' : '#4a5568' }}>
                        You invite people using your own generated invite link. The more invites you get, the more tiers you unlock to earn better and bigger rewards for each tier. <br />
                        Alternatively, you can buy the tiers to get the rewards if you struggle to invite people. Prices will be shown below. <br />
                        You can check the previews of what <Link to="/rewards" style={{ textDecoration: 'underline' }}> <span className="hover:text-blue-500">rewards</span> </Link> you will get in the rewards page.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto grid gap-6">
                    <InviteLinkComponent />
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <div className="mb-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Total Invites</h2>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400">You have invited a total of {invites} people.</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-gray-700 dark:text-white">Current tier: {tier}</div>
                           
                            <Link to="/dashboard" className="flex text-white items-center gap-2 rounded-md px-3 py-2 text-sm font-medium font-helvetica transition-colors hover:bg-muted" style={{ textDecoration: 'none' }}> 
                               <button className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 hover:bg-blue-500 rounded-md"> 
                                   View Invites
                               </button>
                            </Link>
                        </div>
                    </div>

                    <h1 className="text-center dark:text-gray-300 text-gray-700 text-4xl" style={{ color: isDarkMode ? '#ffffff' : '#1a202c' }}>
                        Tiers
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 mb-5 md:grid-cols-4 gap-6">
                        {[
                            { tier: 'Tier 1', invites: 5, price: 10 },
                            { tier: 'Tier 2', invites: 10, price: 20 },
                            { tier: 'Tier 3', invites: 20, price: 40 },
                            { tier: 'Tier 4', invites: 40, price: 70 },
                            { tier: 'Tier 5', invites: 80, price: 100 },
                        ].map(({ tier, invites, price }, index) => (
                            <div key={index} className="text-center bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col">
                                <h2 className="text-lg font-bold text-2xl text-gray-700 dark:text-white"> {tier} </h2>
                                <p className="text-gray-500 font-semibold dark:text-gray-400"> {invites} invites </p>
                                <p className="text-gray-500 dark:text-gray-400"> or pay </p>
                                <h3 className="text-gray-700 font-bold dark:text-gray-300"> ${price} </h3>
                                <a href="https://t.me/daemozon">
                                <button className="mt-auto bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors">
                                    Buy Now
                                </button>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                { /*
                <div className="grid gap-6 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Select Payment Method</h2>
                    <div>
                      <Button variant="ghost" size="icon">
                        <XIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div
                      className={`rounded-lg border p-4 transition-colors hover:bg-muted cursor-pointer flex items-center justify-between ${
                        selectedPaymentMethod === "paypal" ? "border-primary bg-primary-foreground" : "border-muted"
                      }`}
                      onClick={() => setSelectedPaymentMethod("paypal")}
                    >
                      <div className="flex items-center gap-4">
                        <WalletCardsIcon className="h-8 w-8" />
                        <span className="text-lg font-medium">PayPal</span>
                      </div>
                      {selectedPaymentMethod === "paypal" && <CheckIcon className="h-6 w-6 text-primary" />}
                    </div>
                    <div
                      className={`rounded-lg border p-4 transition-colors hover:bg-muted cursor-pointer flex items-center justify-between ${
                        selectedPaymentMethod === "crypto" ? "border-primary bg-primary-foreground" : "border-muted"
                      }`}
                      onClick={() => setSelectedPaymentMethod("crypto")}
                    >
                      <div className="flex items-center gap-4">
                        <DollarSignIcon className="h-8 w-8" />
                        <span className="text-lg font-medium">Crypto</span>
                      </div>
                      {selectedPaymentMethod === "crypto" && <CheckIcon className="h-6 w-6 text-primary" />}
                    </div>
                    <div
                      className={`rounded-lg border p-4 transition-colors hover:bg-muted cursor-pointer flex items-center justify-between ${
                        selectedPaymentMethod === "other" ? "border-primary bg-primary-foreground" : "border-muted"
                      }`}
                      onClick={() => setSelectedPaymentMethod("other")}
                    >
                      <div className="flex items-center gap-4">
                        <CreditCardIcon className="h-8 w-8" />
                        <span className="text-lg font-medium">Other</span>
                      </div>
                      {selectedPaymentMethod === "other" && <CheckIcon className="h-6 w-6 text-primary" />}
                    </div>
                  </div>
                </div>
                */ }
            </main>
        </div>
        <div className="Faoter bg-dark pt-2 text-white text-center flex items-center justify-center">
            <p> &copy; Invicon 2024 </p> <br />
            {/* <a href="mailto:kyrinkompi@gmail.com"><p>Contact developer</p></a> */}
        </div>
        </>
    );
};

export default Component;
