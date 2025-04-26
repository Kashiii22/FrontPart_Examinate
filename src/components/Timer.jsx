import React, { useEffect, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(3600);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec) => `${Math.floor(sec / 60)}:${sec % 60 < 10 ? "0" : ""}${sec % 60}`;

  return <span style={{ color: "white", fontSize: { xs: '0.9rem', sm: '1rem' }, whiteSpace: 'nowrap' }}>{formatTime(time)}</span>;
};

export default Timer;