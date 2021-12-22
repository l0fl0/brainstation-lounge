import './LoungePage.scss';
import UserNavigation from '../components/UserNav/UserNav';

export default function LoungePage() {
  return (
    <main>
      <section className="students">
        <h2>Listening: 5</h2>
        {/* Open live chat onClick */}
        <div></div>
      </section>
      <section className="user">
        <UserNavigation />
      </section>
      <section className="gifs">
        <img src="https://dc85enhu9zukf.cloudfront.net/gifs/4oHyOIBIt57ag.gif" alt="gifs" className="background-gif" />
        {/* <img src="" alt="gifs" className="background-gif" /> */}
      </section>
      <section className="random-tip-container">
      </section>
      <section className="audio-controller">

      </section>
    </main>
  );
}


