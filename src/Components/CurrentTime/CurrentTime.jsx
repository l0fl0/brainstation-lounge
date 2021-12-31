import { useState, useEffect } from "react";

export default function CurrentTime() {
  const [currentTime, setCurrentTime] = useState("00:00:00");

  useEffect(() => {
    const getTime = setInterval(() => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      let time24hrFormat = `${hours}:${minutes}:${seconds}`;

      setCurrentTime(time24hrFormat);
    }, 1000);

    return () => clearInterval(getTime);
  }, []);

  return <div className="toolbar__time">{currentTime}</div>;
}
