import "./CurrentTime.scss";
import { useState, useEffect } from "react";

export default function CurrentTime() {
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [dayOfWeek, setDayOfWeek] = useState("Dayday");
  const [twelveHourFormat, setTwelveHourFormat] = useState(true);

  useEffect(() => {
    const getTime = setInterval(() => {
      const date = new Date();
      let day = date.getDay();
      if (day) {
        day === 0
          ? setDayOfWeek("Sunday")
          : day === 1
          ? setDayOfWeek("Monday")
          : day === 2
          ? setDayOfWeek("Tuesday")
          : day === 3
          ? setDayOfWeek("Wednesday")
          : day === 4
          ? setDayOfWeek("Thursday")
          : day === 5
          ? setDayOfWeek("Friday")
          : setDayOfWeek("Saturday");
      }

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

  return (
    <div>
      <h2 className="toolbar__time">{currentTime}</h2>
      <div className="toolbar__day">{dayOfWeek}</div>
    </div>
  );
}
