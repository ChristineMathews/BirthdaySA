// App.js
import React, { useEffect, useState, useMemo } from 'react';
import FlashScreen from './FlashScreen';
import './App.css';

function App() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [showCurtain, setShowCurtain] = useState(true);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showGreetings, setShowGreetings] = useState(false);
  const [loading, setLoading] = useState(true);

  const birthdayDate = useMemo(() => new Date('December 23, 2023 00:00:00 GMT'), []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const timeLeft = birthdayDate - currentDate;

      if (timeLeft <= 0) {
        setShowCurtain(false);
        setShowFireworks(true);

        setTimeout(() => {
          setShowFireworks(false);
          setShowGreetings(true);
        }, 3000); // Adjust the duration as needed

        const nextYear = birthdayDate.getFullYear() + 1;
        birthdayDate.setFullYear(nextYear);
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

        // Simulate loading completion
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Adjust the duration as needed
    

    return () => {
      clearInterval(interval);
    };
  }, [birthdayDate]);

    return (
    <div className="app-container">
      {/* Conditionally render the FlashScreen or App component based on the loading state */}
      {loading ? (
        <FlashScreen />
      ) : (
        <div className={`app-content ${showCurtain ? 'curtain-open' : ''}`}>
          {showCurtain && (
            <div className="curtain"></div>
          )}

          {!showGreetings && !showFireworks && (
            <div className="curtain-content">
              <h1 className="title">Snehals Birthday Celebration!</h1>
              <div id="countdown">
                <p className="countdown-text">
                  Countdown to the birthday: {`${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}
                </p>
              </div>
            </div>
          )}

          {showFireworks && (
            <div id="fireworks-container">
              <div className="firework"></div>
              <div className="firework"></div>
              {/* Add more fireworks elements as needed */}
            </div>
          )}

          {showGreetings && (
            <div id="greeting">
              <p className="greeting-text">Happy Birthday to the biggest fan of her own birthday!</p>
              <p className="custom-content">
                {/* Add your custom content or additional greetings here */}
                Cheers to another year of joy, laughter, and wonderful memories!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

