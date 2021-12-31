import "./LoungePage.scss";
import { useEffect, useState } from "react";
import UserNav from "../components/UserNav/UserNav";
import Timer from "../components/Timer/Timer";
import Radio from "../components/Radio/Radio";
import Notes from "../components/Notes/Notes";
import CurrentTime from "../components/CurrentTime/CurrentTime";

export default function LoungePage() {
  const [isShowTimer, setShowTimer] = useState(false);
  const [isShowRadio, setShowRadio] = useState(false);
  const [isShowNotes, setShowNotes] = useState(true);

  const showTimer = () => {
    setShowTimer(!isShowTimer);
  };
  const showRadio = () => {
    setShowRadio(!isShowRadio);
  };
  const showNotes = () => {
    setShowNotes(!isShowNotes);
  };

  return (
    <main className="parentContainer">
      <section className="gifs">
        <img
          src="https://dc85enhu9zukf.cloudfront.net/gifs/4oHyOIBIt57ag.gif"
          alt="gifs"
          className="background-gif"
        />
        {/* <img src="" alt="gifs" className="background-gif" /> */}
      </section>
      <section className="stackoverflow-tips"></section>
      <header className="toolbar">
        <section className="toolbar__social">
          <h2 className="toolbar__social-listening">Listening: 5</h2>
          {/* Open live chat onClick */}
          <div></div>
        </section>
        <CurrentTime />
        <UserNav
          showTimer={showTimer}
          showRadio={showRadio}
          showNotes={showNotes}
        />
      </header>
      <div className="popup-container">
        <section className="notes-container">
          {isShowNotes ? <Notes /> : <></>}
        </section>
        <section className="timer-container">
          {isShowTimer ? <Timer /> : <></>}
        </section>
        <section className="radio-container">
          {isShowRadio ? <Radio /> : <></>}
        </section>
      </div>
    </main>
  );
}
