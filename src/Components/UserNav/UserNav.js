import './UserNav.scss';
import { useState } from "react";


export default function UserNav() {
  const [showTitleNotes, setShowTitleNotes] = useState(false);
  const [showTitleTimer, setShowTitleTimer] = useState(false);
  const [showTitleTasks, setShowTitleTasks] = useState(false);
  const [showTitleSettings, setShowTitleSettings] = useState(false);

  // Hover effect doesnt work exactly how expected,but will need refactor but it works
  const handleTitleToggle = (state, set) => {
    setTimeout(() => set(!state), 500)
  }

  return (
    <nav className="user__navigation">

      <div className="user__icon-container" onMouseOver={() => (handleTitleToggle(showTitleNotes, setShowTitleNotes))}>
        <i className="far fa-sticky-note user__icon" />
        {showTitleNotes ? <p className="user__icon-title">Notes</p> : null}
      </div>

      <div className="user__icon-container" onMouseOver={() => (handleTitleToggle(showTitleTimer, setShowTitleTimer))}>
        <i className="far fa-clock user__icon" />
        {showTitleTimer ? <p className="user__icon-title">Timer</p> : null}
      </div>

      <div className="user__icon-container" onMouseOver={() => (handleTitleToggle(showTitleTasks, setShowTitleTasks))}>
        <i className="fas fa-tasks user__icon" />
        {showTitleTasks ? <p className="user__icon-title">Tasks</p> : null}
      </div>

      <div className="user__icon-container" onMouseOver={() => (handleTitleToggle(showTitleSettings, setShowTitleSettings))}>
        <i className="fas fa-user-cog user__icon" />
        {showTitleSettings ? <p className="user__icon-title">Settings</p> : null}
      </div>
    </nav>
  )
}