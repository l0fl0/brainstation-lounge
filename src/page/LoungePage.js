import './LoungePage.scss';
import UserNav from '../components/UserNav/UserNav';
import UserNotes from '../components/UserNotes/UserNotes';
import homerSimson from "../assets/gifs/homerSimson.gif"
export default function LoungePage() {
  return (
    <main>
      <section className="students">
        <h2>Listening: 5</h2>
        {/* Open live chat onClick */}
        <div></div>
      </section>
      <section className="user">
        <UserNav />
      </section>
      <section className="gifs">
        <img src={homerSimson} alt="gifs" className="background-gif" />
        {/* <img src="" alt="gifs" className="background-gif" /> */}
      </section>
      <section className="center">
        <UserNotes />
      </section>
      <section className="audio-controller">

      </section>
    </main>
  );
}


