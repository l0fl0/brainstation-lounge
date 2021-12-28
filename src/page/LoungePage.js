import './LoungePage.scss';
import { useState } from 'react';
import UserNav from '../Components/UserNav/UserNav';
import Timer from '../Components/Timer/Timer';


export default function LoungePage() {
  
  const [isShowTimer, setShowTimer] = useState(false);

  const renderTimer = () => {
    setShowTimer(!isShowTimer);
  }

  return (
    <main>
      <section className="students">
        <h2>Listening: 5</h2>
        {/* Open live chat onClick */}
        <div></div>
      </section>
      <section className="user">
        <UserNav showTimer={renderTimer}/>
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
        {isShowTimer ? <Timer />: <></>}
      </section>
    </main>
  );
}


