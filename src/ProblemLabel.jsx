import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './ProblemLabel.css'

function ProblemLabel({problem, folderName}) {
    
    function viewProblem(e){
        window.location.href = '/ViewProblem/?folderName=' + folderName + '&problem=' + problem.id
    }

    return (
        <>      
        <div class="Problem" onClick={viewProblem}>
            <label className='name'>{problem.Name}</label>
            <label className='difficulty'>{problem.Difficulty}</label>
        </div>
        
        </>
    )
}
export default ProblemLabel