import { useState } from 'react';
import axios from 'axios';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [showVideoLink, setShowVideoLink] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleRestart = () => {
    window.location.reload(); // Restarts the current page
  };

  const handleEnd = async () => {
    try {
      await axios.post('/api/giftget', {
        userName: 'Lea <33',
        email: 'joemama@example.com',
      });
      setShowSubtitle(true); // Show subtitle after "Přijmout dárek"
    } catch (error) {
      console.error('Error sending click to the server:', error);
    }
  };

  const handleButtonClick = () => {
    setIsClicked(true);
    setShowVideoLink(true); // Show the YouTube link
    setIsVideoPlaying(true);
    document.documentElement.style.setProperty('--background-color', '#FFC0CB'); // Change background to pink
    document.documentElement.style.setProperty('--text-color', '#FFFFFF'); // Change text to white
  };

  const handleVideoComplete = () => {
    setIsVideoPlaying(false);
    setShowSubtitle(true); // Show subtitle when the video ends
  };

  return (
    <>
      {/* Show YouTube Link */}
      {showVideoLink && (
        <div className="youtube-link">
          <p>🎥 Watch this video:</p>
          <a
            href="https://youtube.com/shorts/_WHPMjyZ6es"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleVideoComplete}
          >
            Dokoukej a pak se vrať na stránku
          </a>
        </div>
      )}
      {/* Show Subtitle After Video Playback */}
      {showSubtitle && (
        <div className="subtitle">
          <h3>🎉 Thanks for watching! Now claim your gift 🎁</h3>
        </div>
      )}

      {!isClicked && (
        <>
          <h1 className={isClicked ? 'transition-h1' : ''}>Rozhodně nemačkej</h1>
          <div className={isClicked ? 'transition-emoji-icon' : 'emoji-icon'}>
          <img src="https://em-content.zobj.net/source/apple/391/eyes_1f440.png" alt="emoji" />
          </div>
        </>
      )}
      

      <div className={`btn-card ${isClicked ? 'slide-down' : ''}`}>
        {isClicked ? (
          <>
            <button className="restart-button" onClick={handleRestart}>
              <i className="fas fa-sync-alt restart-icon"></i> Restart
            </button>
            <button onClick={handleEnd}>
              <i className="fa-solid fa-gift"></i> Přijmout dárek
            </button>
          </>
        ) : (
          <button onClick={handleButtonClick}>Odhalit dárek</button>
        )}
      </div>

      
    </>
  );
}

export default App;