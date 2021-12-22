import './UserNav.scss';


export default function UserNav() {
  return (
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
  )
}