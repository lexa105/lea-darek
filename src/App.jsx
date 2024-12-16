import { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showClaimButton, setShowClaimButton] = useState(false);
  const videoRef = useRef(null);

  const handleRestart = () => {
    window.location.reload(); // Restarts the current page
  };

  const handleEnd = async () => {
    try {
      await axios.post('/api/giftget', {
        userName: 'Lea <33',
        email: 'joemama@example.com',
      });
      console.log('Click recorded!');
      setShowClaimButton(true);
    } catch (error) {
      console.error('Error sending click to the server:', error);
    }
  };

  const handleButtonClick = () => {
    setIsClicked(true);
    setShowVideo(true); // Show video player
    setTimeout(() => {
      videoRef.current?.play(); // Start the video after transition
    }, 500);

    document.documentElement.style.setProperty('--background-color', '#FFC0CB');
    document.documentElement.style.setProperty('--text-color', '#FFFFFF');
  };

  const handleVideoEnd = () => {
    setShowClaimButton(true); // Show claim button after video ends
  };

  return (
    <>
     {showVideo && (
        <div className="video-container">
          <video
            ref={videoRef}
            className="vertical-video"
            onEnded={handleVideoEnd}
            controls
          >
            <source src="./assets/lea.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

{showClaimButton && (
        <div className="btn-card">
          <button onClick={handleRestart}>
            <i className="fas fa-sync-alt restart-icon"></i> Restart
          </button>
          <button onClick={handleEnd}>
            <i className="fa-solid fa-gift"></i> Přijmout dárek
          </button>
        </div>
      )}
      <h1 className={isClicked ? 'transition-h1' : ''}>Rozhodně nemačkej</h1>
      <div className={isClicked ? 'transition-emoji-icon' : 'emoji-icon'}>
        <img
          src="https://em-content.zobj.net/source/apple/391/eyes_1f440.png"
          alt="emoji"
        />
      </div>

      <div className={`btn-card ${isClicked ? 'slide-down' : ''}`}>
        {!showVideo && (
          <button onClick={handleButtonClick}>
            Odhalit dárek
          </button>
        )}
      </div>
    </>
  );
}

export default App;