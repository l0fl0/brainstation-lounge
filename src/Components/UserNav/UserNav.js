import './UserNav.scss';
import { useState } from "react";


export default function UserNav({ showTimer, showRadio, showStack }) {
  const [showTitleRadio, setShowTitleRadio] = useState(false);
  const [showTitleNotes, setShowTitleNotes] = useState(false);
  const [showTitleTimer, setShowTitleTimer] = useState(false);
  const [showTitleTasks, setShowTitleTasks] = useState(false);
  const [showTitleSettings, setShowTitleSettings] = useState(false);
  const [showTitleStack, setShowTitleStack] = useState(false);
  



  const handleTitleToggle = (set, bool) => {
    setTimeout(() => set(bool), 100)
  }

  return (
    <nav className="user__navigation">

      <div 
        className="user__icon-container" 
        onClick={showStack}
        onMouseEnter={() => (handleTitleToggle(setShowTitleStack, true))}
        onMouseLeave={() => (handleTitleToggle(setShowTitleStack, false))}
      >
        <i className="fas fa-question user__icon" />
        {showTitleStack ? <p className="user__icon-title">Stack Overflow</p> : null}
      </div>

      <div 
        className="user__icon-container" 
        onClick={showRadio}
        onMouseEnter={() => (handleTitleToggle(setShowTitleRadio, true))}
        onMouseLeave={() => (handleTitleToggle(setShowTitleRadio, false))}
      >
        <i className="fas fa-broadcast-tower user__icon" />
        {showTitleRadio ? <p className="user__icon-title">Radio</p> : null}
      </div>

      <div
        className="user__icon-container"
        onMouseEnter={() => (handleTitleToggle(setShowTitleNotes, true))}
        onMouseLeave={() => (handleTitleToggle(setShowTitleNotes, false))}
      >
        <i className="far fa-sticky-note user__icon" />
        {showTitleNotes ? <p className="user__icon-title">Notes</p> : null}
      </div>

      <div
        className="user__icon-container"
        onClick={showTimer}
        onMouseEnter={() => (handleTitleToggle(setShowTitleTimer, true))}
        onMouseLeave={() => (handleTitleToggle(setShowTitleTimer, false))}
      >
        <i className="far fa-clock user__icon" />
        {showTitleTimer ? <p className="user__icon-title">Timer</p> : null}
      </div>

      <div
        className="user__icon-container"
        onMouseEnter={() => (handleTitleToggle(setShowTitleTasks, true))}
        onMouseLeave={() => (handleTitleToggle(setShowTitleTasks, false))}
      >
        <i className="fas fa-tasks user__icon" />
        {showTitleTasks ? <p className="user__icon-title">Tasks</p> : null}
      </div>

      <div
        className="user__icon-container"
        onMouseEnter={() => (handleTitleToggle(setShowTitleSettings, true))}
        onMouseLeave={() => (handleTitleToggle(setShowTitleSettings, false))}
      >
        <i className="fas fa-user-cog user__icon" />
        {showTitleSettings ? <p className="user__icon-title">Settings</p> : null}
      </div>
    </nav>
  )
}