import React, { useEffect, useState } from 'react'
import './CVBox.css'
import CV from '../../cv/CV'

function CVBox() {
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    if (isOpened) {
      document.documentElement.classList.add("no-scroll");
    } else {
      document.documentElement.classList.remove("no-scroll");
    }
  }, [isOpened]);

  return (
    <>
      {isOpened && <div className='cvBox-overlay'></div>}
      <div className={`cvBox-container ${isOpened ? 'active':''}`}>
        <div className='cvBox-button' onClick={() => setIsOpened(!isOpened)}>
          <div><i className={`fa-solid fa-chevrons-${isOpened ? 'down' : 'up'}`}></i></div>
          <p>View CV</p>
        </div>
        <div className='cvBox-box'>
          <div>
            <CV/>
          </div>
        </div>
    </div>
    </>
  )
}

export default CVBox