import './LoungePage.scss';
import { useEffect, useState } from 'react';
import UserNav from '../components/UserNav/UserNav';
import Timer from '../components/Timer/Timer';
import Radio from '../components/Radio/Radio';
import CurrentTime from "../components/CurrentTime/CurrentTime";
import Stack from '../components/Stack/Stack';
import Chat from '../components/Chat/Chat';


export default function LoungePage() {

  const [isShowTimer, setShowTimer] = useState(false);
  const [isShowRadio, setShowRadio] = useState(true);
  const [isShowStack, setShowStack] = useState(false);
  const [isShowChat, setShowChat] = useState(true)

  const showTimer = () => {
    setShowTimer(!isShowTimer);
  }
  const showRadio = () => {
    setShowRadio(!isShowRadio);
  }

  const showStack = () => {
    setShowStack(!isShowStack);
  }

  const showChat = () => {
    setShowChat(!isShowChat);
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
          showChat={showChat}
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
        {isShowChat ? <Chat /> : <></>}
      </section>
    </main>
  );
}


