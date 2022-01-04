import "./LoungePage.scss";
import homer from "../assets/gifs/homer.gif";
import cruising from "../assets/gifs/cruising.gif";
import google from "../assets/gifs/googling.gif";
import photos from "../assets/gifs/photos.gif";
import study from "../assets/gifs/studying.gif";
import { useState } from "react";
import UserNav from "../components/UserNav/UserNav";
import Timer from "../components/Timer/Timer";
import Radio from "../components/Radio/Radio";
import CurrentTime from "../components/CurrentTime/CurrentTime";
import Stack from "../components/Stack/Stack";
import Chat from "../components/Chat/Chat";
import Notes from "../components/Notes/Notes";

export default function LoungePage() {
  const [isShowTimer, setShowTimer] = useState(false);
  const [isShowRadio, setShowRadio] = useState(true);
  const [isShowStack, setShowStack] = useState(false);
  const [isShowChat, setShowChat] = useState(false);
  const [isShowNotes, setShowNotes] = useState(false);

  const gifs = [homer, cruising, google, photos, study];

  const [gifIndex, setGifIndex] = useState(0);

  const nextGif = () => {
    setGifIndex((prevIndex) => {
      return (prevIndex + 1) % gifs.length;
    });
  };

  const prevGif = () => {
    setGifIndex((prevIndex) => {
      if (prevIndex === 0) return gifs.length - 1;
      return (prevIndex - 1) % gifs.length;
    });
  };

  const showTimer = () => {
    setShowTimer(!isShowTimer);
  };
  const showRadio = () => {
    setShowRadio(!isShowRadio);
  };

  const showStack = () => {
    setShowStack(!isShowStack);
  };

  const showChat = () => {
    setShowChat(!isShowChat);
  };

  const showNotes = () => {
    setShowNotes(!isShowNotes);
  };

  return (
    <main className="parent-container">
      <header className="toolbar">
        <section className="toolbar__students-social">
          <h2 onClick={showChat} className="toolbar__students-listening">
            Listening: 5
          </h2>
        </section>

        <CurrentTime />

        <UserNav
          showTimer={showTimer}
          showRadio={showRadio}
          showStack={showStack}
          showChat={showChat}
          showNotes={showNotes}
        />
      </header>

      <section className="gifs">
        <img src={gifs[gifIndex]} alt="gifs" className="background-gif" />
      </section>
      <section className="timer-container">
        {isShowTimer ? <Timer /> : <></>}
      </section>
      <section className="radio-container">
        {isShowRadio ? <Radio /> : <></>}
      </section>
      <section className="stack-container">
        {isShowStack ? <Stack /> : <></>}
      </section>
      <section className="chat-container">
        {isShowChat ? <Chat /> : <></>}
      </section>
      <section className="notes-container">
        {isShowNotes ? <Notes /> : <></>}
      </section>
      <section className="bg-selector">
        <i onClick={prevGif} class="fas fa-arrow-left bg-selector__icon"></i>
        {" change your vibe "}
        <i onClick={nextGif} class="fas fa-arrow-right bg-selector__icon"></i>
      </section>
    </main>
  );
}
