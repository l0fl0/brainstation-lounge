import "./Settings.scss";

export default function Settings({ prevGif, nextGif, setTwelveHourFormat }) {
  return (
    <div className="settings-wrapper">
      <div className="time-button">
        24 hour format
        <button
          onClick={() => {
            setTwelveHourFormat(false);
          }}
        >
          Yes
        </button>
      </div>
      <section className="bg-selector">
        <i onClick={prevGif} class="fas fa-arrow-left bg-selector__icon"></i>
        {" change your vibe "}
        <i onClick={nextGif} class="fas fa-arrow-right bg-selector__icon"></i>
      </section>
      <div>Sign Out</div>
    </div>
  );
}
