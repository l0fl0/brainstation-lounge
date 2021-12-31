import { useState, useEffect } from "react";

export default function CurrentTime() {
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [twelveHourFormat, setTwelveHourFormat] = useState(true);

  useEffect(() => {
    const getTime = setInterval(() => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let meridiem = hours < 12 ? "AM" : "PM";

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (!twelveHourFormat) {
        let time24hrFormat = `${hours}:${minutes}:${seconds}`;
        setCurrentTime(time24hrFormat);
      }

      if (twelveHourFormat) {
        hours = hours > 12 ? hours - 12 : hours;
        if (hours === "00") hours = 12;
        let time12hrFormat = `${hours}:${minutes}:${seconds} ${meridiem}`;
        setCurrentTime(time12hrFormat);
      }
    }, 1000);

    return () => clearInterval(getTime);
  }, [twelveHourFormat]);

  return <div className="toolbar__time">{currentTime}</div>;
}
