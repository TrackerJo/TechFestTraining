import React from 'react'
import ReactDOM from 'react-dom/client'
import './StartCompetition.css'
import ParticipantLabel from './participantLabel.jsx'
import SettingComp from './SettingsCompetition.jsx'
import { useState, useEffect } from 'react'
import { getParticipants, changeCompSettings } from './firebase.js'
import { useForcedReload } from './useForcedReload'
import { useParticipants } from './useParticipants'

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount((count) => count - 1)}>-</button>
      Count is {count}
      {new Array(count).fill(0).map((_, index) => {
        console.log({index})
        return <div>{index}</div>
      })}
      <button onClick={() => setCount((count) => count + 1)}>+</button>
    </div>
  )
}

const UserList = ({compCode}) => {
  const [participants, setParticipants] = useState([])
  const [reloadCount, setReloadCount] = useState(0)
  
  const trappedSetParticipant = (newParticipants) => {
    console.log("participants set")
    setParticipants(newParticipants)
    setReloadCount(reloadCount => reloadCount + 1)
  }

  useEffect(() => {
    console.log("get participants")
    getParticipants(compCode, trappedSetParticipant)
  }, [])

  console.log({participants})

  return (
    <div>
    Competition Code: {compCode}
    # of Participants: {participants.length}
      <div>
      {participants.map((participant) => <ParticipantLabel key={participant.id} participant={participant}/>)}
      </div>
    </div>
  )
}

const WaitingRoom = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const compCode = urlParams.get('compCode');

  return (
    <UserList compCode={compCode}></UserList>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CreateComp />
  </React.StrictMode>
)

function CreateComp() {  
  // const [participants, setParticipants] = useState([])

  //get competition code parameter from url
  const urlParams = new URLSearchParams(window.location.search);
  const compCode = urlParams.get('compCode');
  const participants = useParticipants(compCode)
  const [settings, setSettings] = useState({})
  const [settingsShown, setSettingsShown] = useState("starting")
  // const forceReload = useForcedReload()
  
  // const trappedSetParticipant = (newParticipants) => {
  //   console.log("participants set")
  //   setParticipants(newParticipants)
  //   forceReload()
  // }

  // useEffect(() => {
  //   console.log("get participants")
  //   getParticipants(compCode, trappedSetParticipant)
  // }, [])
  
  function openSettings(e){
    setSettingsShown("shown")
  }

  function changeSettings(setting){
    setSettings(setting)
    changeCompSettings(compCode, setting)
    //console.log("Changed Settings", setting)
  }

  //console.log({participants})

  return (
      <>      
      <div className="CreateComp" >
        <h1>Mini Competion</h1>
        <img src="src/assets/settings.png" alt="settings" className='settingGear' onClick={openSettings}/>
          <label>Competition Code: {compCode}</label>
              <br />
              <label>Max Players: {settings.maxPlayers}</label>
              <br />
              <label>Time Limit: {settings.timeLimit} minutes</label>
              <br />
              <label>Participants:</label>
              <br />
              <div className='Participants'>
                  {participants.map((participant) => (
                      <ParticipantLabel key={participant.id} participant={participant}/>
                  ))}
              </div>
              <div onClick={() => alert(participants.length)}># of Participants {participants.length}</div>
      </div>
      <SettingComp shown={settingsShown} setSettings={changeSettings} setShown={setSettingsShown}/>
      </>
  )
  
}
export default CreateComp