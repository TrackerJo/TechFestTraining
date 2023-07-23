import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { createMiniCompetition, signOutUser } from './firebase.js'

function App() {
  const [count, setCount] = useState(0)

  function redirectToPFoldersList(e){
    window.location.href = '/TechFestTraining/ProblemFolders/'
  }

  function redirectToFindProblem(e){
    window.location.href = '/TechFestTraining/FindProblems/'
  }

  async function createCompetition(e){
    const date = new Date()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const randNum = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    let competitionCode = day * hour * minute * randNum;
    let compString = String(competitionCode)
    competitionCode = compString.substring(0, 6)
    await createMiniCompetition(competitionCode)
    
    window.location.href = '/TechFestTraining/startCompetition.html?compCode=' + competitionCode
  }

  function redirectToCompletedProblems(e){
    window.location.href = '/TechFestTraining/CompletedProblems/'
  }
  
  function handleLogout(e){
    signOutUser(); 
  }

  return (
    <div className="App">
      <div>
        <h1 className='title'>Welcome to the Tech Fest Practice Website</h1>
        <br />
        <button onClick={redirectToPFoldersList}>View Practice Problems</button>
        <br />
        <br />
        <button onClick={redirectToFindProblem}>Find Practice Problems</button>
        <br />
        <br />
        {//<button onClick={createCompetition}>Create Competition</button>
  
        //<br />
       // <br />
}
        <button onClick={redirectToCompletedProblems}>View Completed Problems</button>
        <br />
        <br />
        <button>View Profile</button>
        <br />
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default App
