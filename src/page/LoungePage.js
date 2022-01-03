import './LoungePage.scss';
import { useEffect, useState } from 'react';
import UserNav from '../Components/UserNav/UserNav';
import Timer from '../Components/Timer/Timer';
import Radio from '../Components/Radio/Radio';
import CurrentTime from "../Components/CurrentTime/CurrentTime";
import Stack from '../Components/Stack/Stack';
import Chat from '../Components/Chat/Chat';


export default function LoungePage() {

  const [isShowTimer, setShowTimer] = useState(true);
  const [isShowRadio, setShowRadio] = useState(true);
  const [isShowStack, setShowStack] = useState(true);

  const showTimer = () => {
    setShowTimer(!isShowTimer);
  }
  const showRadio = () => {
    setShowRadio(!isShowRadio);
  }

  const showStack = () => {
    setShowStack(!isShowStack);
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
          showStack={showStack}
        />

      </header>

      <section className="gifs">
        <img src="https://dc85enhu9zukf.cloudfront.net/gifs/4oHyOIBIt57ag.gif" alt="gifs" className="background-gif" />
        {/* <img src="" alt="gifs" className="background-gif" /> */}
      </section>
      <section className="timer-container">
        {isShowTimer ? <Timer /> : <></>}
      </section>
      <section className='radio-container'>
        {isShowRadio ? <Radio /> : <></>}
      </section>
      <section className='stack-container'>
        {isShowStack ? <Stack /> : <></>}
      </section>
      <section className='chat-container'>
        <Chat />
      </section>
    </main>
  );
}


