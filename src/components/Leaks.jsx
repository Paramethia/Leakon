import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast, ToastContainer, Bounce, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiHome as HomeIcon, FiCamera as CameraIcon, FiUsers as UsersIcon, FiMail as ConIcon, FiLogOut as LoutIcon, FiCopy as CopyIcon } from 'react-icons/fi';
import { FaMoon, FaSun, FaBars, FaTimes, FaPlay, FaPause, FaExpand, FaPaypal, FaBitcoin, FaWallet, FaTimesCircle } from 'react-icons/fa';
import './Extra styles.css';

const Header = () => {
    return ( 
        <Helmet>
            <title> Leakon - leaks </title>
        </Helmet>
        );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const {username} = useContext(UserContext);
  let inviteLink = localStorage.getItem('inviteLink');
  let code = inviteLink.slice(-8);

  const logOut = () => { localStoarge.removeItem("username") }

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
        } md:translate-x-0 md:relative md:block z-40`}
        style={{ backgroundColor: "#282434" }}
    >
      <div className="flex static justify-between items-center mb-6">
        <div className="text-white flex items-center gap-2">
            <img src="Invicon navbar logo.png" alt="Invicon Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold mt-2 font-helvetica">{username}</h1>
        </div>
        <button className="md:hidden" onClick={toggleSidebar}>
          <FaTimes className="h-6 w-6 text-white" />
        </button>
      </div>

      <nav className="Navigation flex flex-col gap-2 mb-10">
        <Link to="/home" className="flex items-center text-white gap-2 rounded-md px-3 py-2 font-helvetica transition-colors H-effect" style={{ textDecoration: 'none' }}>
            <HomeIcon className="h-4 w-4" /> Home
        </Link>
        <Link to="/leaks" className="flex items-center text-white  gap-2 rounded-md px-3 py-2 font-helvetica transition-colors H-effect" style={{ textDecoration: 'underline' }}>
            <CameraIcon className="h-4 w-4" /> Leaks
        </Link>
        <Link to="/dashboard" className="flex text-white items-center gap-2 rounded-md px-3 py-2 font-helvetica transition-colors H-effect" style={{ textDecoration: 'none' }}>
            <UsersIcon className="h-4 w-4" /> Dashboard
        </Link>
        <Link to="/login" onClick={logOut} className="flex text-white items-center gap-2 rounded-md px-3 py-2 font-helvetica transition-colors H-effect" style={{ textDecoration: 'none' }}>
            <LoutIcon className="h-4 w-4" /> Log out
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
          <div className="r-code flex items-center justify-between">
            <span className="text-sm font-medium font-helvetica">{code}</span>
            <button className="bg-transparent p-2 rounded-full" onClick={handleCopyReferralCode}>
              <CopyIcon id="copy-icon" className="h-4 w-4 H-effect" />
            </button>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};

const PaymentOptions = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-8">
            <div className="Payment-options bg-gray-300 dark:bg-gray-800 rounded-lg p-6 w-80 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-white">
                    <FaTimesCircle className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-bold text-gray-700 dark:text-white mb-4 text-center">Select Payment Method</h2>
                <div className="grid gap-4">
                    <a href="https://www.paypal.com/paypalme/KyrinKompi" target="_blank">
                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"> <FaPaypal className="w-6 h-6 mr-2 inline" /> PayPal </button>
                    </a>
                    <p className="text-xs text-black">
                        <span className="font-bold">NOTE:</span> Ensure you include a message with your username when sending the money.
                    </p>
                    <a href="https://www.instagram.com/poison8x/profilecard/?igsh=MWRnejFnNzRwN3U3OA==" target="_blank">
                       <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"> <FaBitcoin className="w-6 h-6 mr-2 inline" /> Crypto </button>
                    </a>
                    <a href="https://www.instagram.com/poison8x/profilecard/?igsh=MWRnejFnNzRwN3U3OA==" target="_blank">
                       <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"> <FaWallet className="w-6 h-6 mr-2 inline" /> Other </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

const Leaks = () => {
  const navigate = useNavigate();
  let { username } = useContext(UserContext);
  const storedUsername = localStorage.getItem("username");
  const [currentTier, setCurrentTier] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visible, setVisiblity] = useState(true);
  const [playingIndex, setPlayingIndex] = useState(null);
  const videoRefs = useRef([]);
  const darkModeStyles = { backgroundColor: '#101424' };
  const lightModeStyles = { backgroundColor: '#ffffff' };
  const [spoilers, setSpoilers] = useState([]);
  const [isPaymentConOpen, setIsPaymentConOpen] = useState(false);
  const adsWatched = localStorage.getItem("adsWatched");
  let seconds = 0;
  let minutes = 0;
  let moan = new Audio('ahh sound effect.mp3');

  if (storedUsername) username = storedUsername;
  if (!adsWatched) adsWatched = 0;

  let NotLogged = () => {
        toast.error("You are not logged in.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        setTimeout(() => {
            navigate('/login');
        }, 3300)
    }

  useEffect(() => {
    const fetchTier = async () => {
        try {
            const response = await axios.post('https://invicon-back-end.onrender.com/getTier', { username });

            if (response.data.message === "User found.") {
                setCurrentTier(response.data.tier);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching tier:', error);
        }
    };

    if (username) {
        fetchTier();
    } else {
        NotLogged()
    }
}, [username]);

const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
};

const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
};

const visibility = () => { 
    setVisiblity(!visible)
}

const toggleSpoiler = (index) => {
    setSpoilers(prev => {
      const newSpoilers = [...prev];
      newSpoilers[index] = !newSpoilers[index];
      return newSpoilers;
    });
};

const playorpause = (index) => {
    if (playingIndex === index) {
      videoRefs.current[index].pause();
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null) {
        videoRefs.current[playingIndex].pause();
      }
      videoRefs.current[index].play();
      setPlayingIndex(index);
    }
  };

  const toggleFullScreen = (index) => {
    const videoElement = videoRefs.current[index];
    if (!document.fullscreenElement) {
      videoElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const payOptionsOpen = () => {
       setIsPaymentConOpen(true);
  }

  const payOptionsClose = () => {
       setIsPaymentConOpen(false)
  }

  const playMoan = () => {
      moan.play()
  }

  const videoLinks = [
    'https://res.cloudinary.com/doxalk3ms/video/upload/v1727959702/Sophie_Rain_spider-man_video_cbp5rv.mp4',
    'https://res.cloudinary.com/doxalk3ms/video/upload/v1721770897/Sophie_rain_leak_nmfi8v.mp4',
    'https://res.cloudinary.com/doxalk3ms/video/upload/v1721770907/Sophie_rain_leak_2_cgxlrh.mp4',
    'https://res.cloudinary.com/doxalk3ms/video/upload/v1725916461/Preview_OF_leak_by_Leakon_akoxgy.mp4',
    'https://res.cloudinary.com/doxalk3ms/video/upload/v1726268596/Leak_preview_4_rfspvo.mov',
    'https://res.cloudinary.com/doxalk3ms/video/upload/v1725916592/Preview_OF_leak_by_Leakon_8_qidwuc.mp4',
    'https://res.cloudinary.com/doxalk3ms/video/upload/v1726269420/Leak_preview_vid_2_jk9u6d.mp4',
    'https://video.twimg.com/ext_tw_video/1604295303590547457/pu/vid/240x480/A2ixWD4QUFL7u3rG.mp4?tag=12',
    'https://video.twimg.com/ext_tw_video/1615548183693639680/pu/vid/264x480/U2AOYNHKsAQluEBb.mp4?tag=12',
    'https://video.twimg.com/ext_tw_video/1605345387388305411/pu/vid/592x1280/d5HK50CLMhytB5s5.mp4?tag=12',
    'https://res.cloudinary.com/doxalk3ms/video/upload/v1727207055/Cousin_snap_sfzsqs.mp4',
    'https://video.twimg.com/ext_tw_video/1589082532502556673/pu/vid/448x848/IevM36BWt33yZ-tz.mp4?tag=12'
  ];

  const rewardLinks = {
    1: "https://mega.nz/folder/EeclATSK#u2bjWNziBSUfuBobG_wF3g",
    2: "https://mega.nz/folder/V38zESTR#iapYzbC-dzi6Fa1-IQTLhw",
    3: "https://mega.nz/folder/hAYQ0JaK#DcYvtQDi8zupIc5PvUos6Q",
    4: "https://mega.nz/folder/UZZDyKwQ#_ieBD-WQ9svGNZ3bDRtjzQ",
    5: "https://mega.nz/folder/wrECSRIL#tRCMug-6v4nvcI8xc_1KCA",
    6: "https://mega.nz/folder/BmswnLTa#xkUUxK_4KRyWd6OPMkNT5A",
    7: "https://mega.nz/folder/8SVyEATT#5DMFyVMfypmNMTvdD7nmAA/folder/5HklUQzZ",
    8: "https://mega.nz/folder/aHIBxSjD#HhatRbyztC25c4Gq3JjvSA"
  };

  const addvertVidoeURLs = [
    "",
    "",
    "",
    ""
  ]

  const addvertLinks = {
      1: "https://jvz5.com/c/2712115/391483/",
      2: "",
      3: "",
      4: "",
  }

  return (    
    <>  

    <ToastContainer />

    <div className="flex h-screen">
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <main
        className="flex-1 p-8 space-y-6 overflow-auto"
        style={isDarkMode ? darkModeStyles : lightModeStyles}
    >
        <div
            className="Top-bar flex px-3 mb-5 items-center justify-between"
            style={{
                backgroundColor: isDarkMode ? '#101424' : '#282434',
                padding: '10px',
                borderRadius: '5px',
            }}
        >
                <div className={`ham-menu md:hidden left-12 z-50 ${isSidebarOpen ? 'hidden' : ''}`}>
                <button onClick={toggleSidebar}>
                        <FaBars className="h-6 w-6 text-white" />
                    </button>
                </div>
                <Link to="/home" style={{ textDecoration: 'none' }} className="Logo flex-1">
                    <div className="text-white flex items-center gap-2 justify-center md:justify-start">
                        <img src="Invicon top bar logo.png" alt="Invicon Logo" className="w-8 h-8" />
                        <h1 className="text-2xl font-bold font-helvetica">Leakon</h1>
                    </div>
                </Link>
                <div className="Theme">
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

        <h1 className="text-center text-4xl" style={{ color: isDarkMode ? '#ffffff' : '#1a202c' }}>
          Preview Leaks
        </h1>
        <p className="text-center text-2xl" style={{ color: isDarkMode ? '#ffffff' : '#1a202c' }}>
          These are previews of leaked only fans content & snap chat nudes we have. <br />
          You can get more than 50GB worth of videos in a single tier you unlock. <br />
          Here are the few previews below <br /> ⬇️
        </p>

        <center><button id="preview-button" onClick={() => visibility()}> {visible ? "Hide previews" : "Show previews"} </button> </center>

        <div className="w-full pt-4 pb-12 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            {visible && (
              <div className="Previews flex-wrap justify-evenly">
              {videoLinks.map((link, index) => (
                <div
                  key={index}
                  className="vid-con group relative rounded-lg p-4 shadow-md transition-all bg-gray-400 hover:bg-gray-600"
                  onClick={() => toggleSpoiler(index)}
                >
                <video 
                    ref={(el) => (videoRefs.current[index] = el)}  
                    src={link} 
                    className={"relative rounded-lg"} 
                    style={{ filter: !spoilers[index] ? 'blur(20px)' : 'none' }} 
                    controls={false}
                />
                <button onClick={() => playorpause(index)} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl">
                    {playingIndex === index ? <FaPause /> : <FaPlay />}
                </button>
                <button onClick={() => toggleFullScreen(index)} className="absolute bottom-5 right-2 bg-gray-800 text-white p-2 rounded-full">
                    <FaExpand />
                </button>
                </div>
              ))}
            </div>
           )}
            <center>{visible && ( <a href="https://discord.gg/qN4w9ckCPQ" target="_blank"><button id="dis-button"> Check out more previews here </button></a> )}</center>

            <center> <hr /> </center>

            <div className="mt-10 space-y-4">

              <h2 className="text-center text-2xl text-gray-500">
                  Receive a lot more with higher tiers.
              </h2>
                
              <br />

              <p className="text-center text-xl text-gray-500" style={{ color: isDarkMode ? '#ffffff' : '#1a202c'}}> Tier rewards will appear below once you unlock tiers: </p>
              
              <p className="text-center text-xl text-gray-500" style={{ color: isDarkMode ? '#ffffff' : '#1a202c'}}> Current tier: <span className="text-blue-500">{currentTier}</span> </p>

              <br /> <br />

              <div className="Reward-claim">
                  <center>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((tier) => (
                      currentTier >= tier && (

                      <div key={tier} className="Tier-reward text-center shadow rounded-lg p-6 flex flex-col">
                        <h2 className="text-lg font-bold text-2xl text-green-600"> Tier {tier} unlocked 🔓 </h2>
                        <p className="text-gray-500 font-semibold dark:text-gray-400"> Download your reward </p>
                        <p className="text-gray-500 dark:text-gray-400"> or watch it online </p>
                        <a
                          href={rewardLinks[tier]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center bg-[#282434] text-white font-bold py-2 px-4 rounded transition-colors hover:bg-[#3c3a4e]"
                        >
                            <button id="reward-button" className="bg-gray-500 hover:bg-blue-500 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md" onMouseOver={() => playMoan() }>
                                Claim reward
                            </button>
                        </a>
                      </div>

                    )))}

                    {currentTier < 8 && (
                        <button id="tier-buy-button" className="bg-gray-500 hover:bg-blue-500 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md" onClick={payOptionsOpen}>
                          Buy a tier 🧧
                        </button>
                    )}
                </center>
              </div>
            </div>
            <center> <hr /> </center>

            <div className="Reward-claim">

              <h2 className="text-center text-3xl text-gray-600">
                  Extra Free rewards
              </h2>

              <br />

               <p className="text-xl text-center text-gray-500" style={{ color: isDarkMode ? '#ffffff' : '#1a202c'}}> Coming soon </p>

              <br />
                
              <center>
                    <button id="watch-ad-button" className="bg-gray-500 hover:bg-blue-500 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md">
                          Watch an ad 📺
                    </button>
                    {/*[1, 2, 3, 4, 5, 6, 7, 8].map() => (
                      adsWatched >= 8 && (

                      <div key={tier} className="Tier-reward text-center shadow rounded-lg p-6 flex flex-col">
                        <h2 className="text-lg font-bold text-2xl text-lime-600"> Reward unlocked 🔓 </h2>
                        <p className="text-gray-500 font-semibold dark:text-gray-400"> Download your reward </p>
                        <p className="text-gray-500 dark:text-gray-400"> or watch it online </p>
                        <a
                          href={advertLinks[adsWatched]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center bg-[#282434] text-white font-bold py-2 px-4 rounded transition-colors hover:bg-[#3c3a4e]"
                        >
                            <button id="reward-button" className="bg-gray-500 hover:bg-blue-500 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md" onMouseOver={() => playMoan() }>
                                Claim reward
                            </button>
                        </a>
                      </div>

                    )))}

                    {adsWatched < 12 && (
                        <button id="tier-buy-button" className="bg-gray-500 hover:bg-blue-500 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md" onClick={payOptionsOpen}>
                          Buy a tier 🧧
                        </button>
                    )*/}
                </center>
                
            </div>
          </div>
        </div>
      </main>
    </div>

        { isPaymentConOpen && <PaymentOptions onClose={payOptionsClose} /> }

    </>
  );
};

export default Leaks;
