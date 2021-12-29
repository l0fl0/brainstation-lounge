import './LoungePage.scss';
import { useState } from 'react';
import UserNav from '../Components/UserNav/UserNav';
import Timer from '../Components/Timer/Timer';
import Radio from '../Components/Radio/Radio';
import Stack from '../Components/Stack/Stack';


export default function LoungePage() {
  
  const [isShowTimer, setShowTimer] = useState(true);
  const [isShowRadio, setShowRadio] = useState(true);

  const showTimer = () => {
    setShowTimer(!isShowTimer);
  }
  const showRadio = () => {
    setShowRadio(!isShowRadio);
  }

  return (
    <main>
      <section className="students">
        <h2 className="students__count">Listening: 5</h2>
        {/* Open live chat onClick */}
        <div></div>
      </section>
      <section className="user">
        <UserNav 
          showTimer={showTimer}
          showRadio={showRadio}
        />
      </section>
      <section className="gifs">
        <img src="https://dc85enhu9zukf.cloudfront.net/gifs/4oHyOIBIt57ag.gif" alt="gifs" className="background-gif" />
        {/* <img src="" alt="gifs" className="background-gif" /> */}
      </section>
      <section className="random-tip-container">
      </section>
      <section className="audio-controller">
      </section>
      <section className="timer-container">
        {isShowTimer ? <Timer /> : <></>}
      </section>
      <section className='radio-container'>
        {isShowRadio ? <Radio /> : <></>}
      </section>
      <section className='stack-container'>
        <Stack />
      </section>
    </main>
  );
}


