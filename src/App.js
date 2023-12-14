import React, { useEffect, useState, useMemo } from 'react';
import './App.css';

function App() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [showCountdown, setShowCountdown] = useState(true);

  const birthdayDate = useMemo(() => new Date('December 23, 2023 00:00:00 GMT'), []); // Use useMemo

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const timeLeft = birthdayDate - currentDate;

      if (timeLeft <= 0) {
        // Birthday has passed, show the next year countdown
        setShowCountdown(true);
        const nextYear = birthdayDate.getFullYear() + 1;
        birthdayDate.setFullYear(nextYear);
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [birthdayDate]); // Include birthdayDate in the dependency array

  return (
    <div className="App">
      <h1>Happy Birthday Celebration!</h1>
      {showCountdown ? (
        <div id="countdown">
          <p>Countdown to the birthday:</p>
          <p>{`${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}</p>
        </div>
      ) : (
        <div id="greeting">
          <p>Happy Birthday to the biggest fan of her own birthday!</p>
          {/* Add more greetings or custom content */}
        </div>
      )}
    </div>
  );
}

export default App;
