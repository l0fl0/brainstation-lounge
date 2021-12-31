import './LoungePage.scss';
import { useEffect, useState } from 'react';
import UserNav from '../components/UserNav/UserNav';
<<<<<<< HEAD
import UserNotes from '../components/UserNotes/UserNotes';
import homerSimson from "../assets/gifs/homerSimson.gif"
=======
import Timer from '../components/Timer/Timer';
import Radio from '../components/Radio/Radio';
import CurrentTime from "../components/CurrentTime/CurrentTime";

>>>>>>> develop
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
      <header className="toolbar">

        <section className="toolbar__students-social">
          <h2 className="toolbar__students-listening">Listening: 5</h2>
          {/* Open live chat onClick */}
          <div></div>
        </section>

        <CurrentTime />

        <UserNav
          showTimer={showTimer}
          showRadio={showRadio}
        />

      </header>

      <section className="gifs">
        <img src={homerSimson} alt="gifs" className="background-gif" />
        {/* <img src="" alt="gifs" className="background-gif" /> */}
      </section>
<<<<<<< HEAD
      <section className="center">
        <UserNotes />
=======
      <section className="stackoverflow-tips">
>>>>>>> develop
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


