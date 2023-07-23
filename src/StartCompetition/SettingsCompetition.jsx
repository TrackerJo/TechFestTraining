import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './StartCompetition.css'

function SettingComp({shown, setSettings, setShown}) {
    
    

    function handleSettings(e){
        setSettings({
            timeLimit: document.getElementById('timeLimit').value,
            maxPlayers: document.getElementById('maxPlayers').value
        })
        setShown("hidden")
        
        
    }
    
    
        return (
            <>      
            <div className="Settings" id={shown}>
                <label className='SettingsLabel'>Settings</label>
                <br />
                <label htmlFor="timeLimit">Time Limit:</label>
                <input type="number" id='timeLimit' className='settingsInput'/>
                <br />
                <label htmlFor="maxPlayers">Max Players:</label>
                <input type="number" id='maxPlayers' className='settingsInput'/>
                <br />
                <button onClick={handleSettings}>Save Changes</button>
            </div>
            
            </>
        )
    }
   
export default SettingComp