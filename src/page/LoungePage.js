import './LoungePage.scss';


export default function LoungePage() {
  return (
    <main>
      <section className="students">
        <h2>Listening: 5</h2>
        {/* Open live chat onClick */}
        <div></div>
      </section>
      <section className="user">
        <nav className="user__navigation">
          {/* Modal comes out with Notes and folders */}
          <i className="far fa-sticky-note user__navigation-icon" title="Notes"></i>
          {/* Pomodoro time and regular timer */}
          {/* on screen animation for timer  */}
          <i className="far fa-clock user__navigation-icon" title="Timers"></i>
          {/* Opens a modal of a task list*/}
          {/* current task can be changed and shown as student activity */}
          <i className="fas fa-tasks user__navigation-icon" title="Tasks"></i>
          {/* Drop down menu for user settings/ customization */}
          <i className="fas fa-user-cog user__navigation-icon" title="Settings"></i>
        </nav>
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


