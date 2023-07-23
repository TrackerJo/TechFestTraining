import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './ProblemFolder.css'

function ProblemFolder({folder}) {
    
    function openFolder(e){
        window.location.href = '/TechFestTraining/Problems/?folderName=' + folder.id
    }

    return (
        <>      
        <div class="ProblemFolder" onClick={openFolder}>
            <label className='ProblemLabel'>{folder.Name}</label>
        </div>
        
        </>
    )
}
export default ProblemFolder