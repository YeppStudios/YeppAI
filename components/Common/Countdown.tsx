import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

function Countdown({ targetDate }: CountdownProps) {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedCountdown = countdownToDate(targetDate, now);
      setCountdown(formattedCountdown);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  function countdownToDate(targetDate: Date, now: Date) {
    const targetTime = targetDate.getTime();
    const timeRemaining = targetTime - now.getTime();

    // Calculate the remaining days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Format the countdown string in the format "01d 05h 23m 21s"
    const formattedCountdown = `${days.toString().padStart(2, '0')}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;

    return formattedCountdown;
  }

  return <div>{countdown}</div>;
}

export default Countdown;
