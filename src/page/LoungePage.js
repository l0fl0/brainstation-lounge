import './LoungePage.scss';
import { useEffect, useState } from 'react';
import UserNav from '../components/UserNav/UserNav';
import Timer from '../components/Timer/Timer';
import Radio from '../components/Radio/Radio';


export default function LoungePage() {

  const [currentTime, setCurrentTime] = useState("00:00:00")
  const [isShowTimer, setShowTimer] = useState(true);
  const [isShowRadio, setShowRadio] = useState(true);

  const showTimer = () => {
    setShowTimer(!isShowTimer);
  }
  const showRadio = () => {
    setShowRadio(!isShowRadio);
  }

  const localTime = () => {
    const date = new Date;
    console.log(date.getHours());
    let time24hr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return setCurrentTime(time24hr)
  }

  useEffect(() => {
    setInterval(localTime, 1000);
    return clearInterval(localTime)
  })


  return (
    <main>
      <header className="toolbar">
        <section className="toolbar__students-social">
          <h2 className="toolbar__students-listening">Listening: 5</h2>
          {/* Open live chat onClick */}
          <div></div>
        </section>

        <section className="toolbar__tools">
          <UserNav
            showTimer={showTimer}
            showRadio={showRadio}
          />
        </section>
      </header>

      <section className="gifs">
        <img src="https://dc85enhu9zukf.cloudfront.net/gifs/4oHyOIBIt57ag.gif" alt="gifs" className="background-gif" />
        {/* <img src="" alt="gifs" className="background-gif" /> */}
      </section>
      <section className="stackoverflow-tips">
      </section>
      <section className="timer-container">
        {isShowTimer ? <Timer /> : <></>}
      </section>
      <section className='radio-container'>
        {isShowRadio ? <Radio /> : <></>}
      </section>
    </main>
  );
}


