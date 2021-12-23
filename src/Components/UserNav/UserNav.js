import './UserNav.scss';
import { useState } from "react";


export default function UserNav() {
  const [showTitleNotes, setShowTitleNotes] = useState(false);
  const [showTitleTimer, setShowTitleTimer] = useState(false);
  const [showTitleTasks, setShowTitleTasks] = useState(false);
  const [showTitleSettings, setShowTitleSettings] = useState(false);

  const handleTitleToggle = (state, set) => {
    setTimeout(() => set(!state), 500)
  }

  return (
    <nav className="user__navigation">
      <div className="user__icon-container" onMouseOver={() => (handleTitleToggle(showTitleNotes, setShowTitleNotes))}>
        <i className="far fa-sticky-note user__icon" />
        {showTitleNotes ? <p className="user__icon-title">Notes</p> : null}
      </div>
      {/* Pomodoro time and regular timer */}
      {/* on screen animation for timer  */}
      <div className="user__icon-container" onMouseOver={() => (handleTitleToggle(showTitleTimer, setShowTitleTimer))}>
        <i className="far fa-clock user__icon" />
        {showTitleTimer ? <p className="user__icon-title">Timer</p> : null}
      </div>
      {/* Opens a modal of a task list*/}
      {/* current task can be changed and shown as student activity */}
      <div className="user__icon-container" onMouseOver={() => (handleTitleToggle(showTitleTasks, setShowTitleTasks))}>
        <i className="fas fa-tasks user__icon" />
        {showTitleTasks ? <p className="user__icon-title">Tasks</p> : null}
      </div>
      {/* Drop down menu for user settings/ customization */}
      <div className="user__icon-container" onMouseOver={() => (handleTitleToggle(showTitleSettings, setShowTitleSettings))}>
        <i className="fas fa-user-cog user__icon" />
        {showTitleSettings ? <p className="user__icon-title">Settings</p> : null}
      </div>
    </nav>
  )
}