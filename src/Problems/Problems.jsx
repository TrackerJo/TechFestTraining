import { useState, useEffect } from 'react'
import '../App.css'
import ProblemLabel from '../ProblemLabel'
import { getProblemsList} from '../firebase.js'
import BackArrow from '../assets/back_arrow.png'

function Problems() {
    const [problems, setProblems] = useState([])
     //Get Folder name from url
     const urlParams = new URLSearchParams(window.location.search);
     const folderName = urlParams.get('folderName');
    useEffect(() => {
        // React advises to declare the async function directly inside useEffect
        async function getProblems() {
          
           
          const problems =  await getProblemsList(folderName)
            
          setProblems(problems);
          
        };
    
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        
            getProblems();
        
      }, []);

    function backToFolders(e){
        window.location.href = '/TechFestTraining/ProblemFolders/'
    }
    return (
        <div className="ProblemList">
            <div>
            <img  src={BackArrow} className='backArrow' onClick={backToFolders}></img>
                <h1>Problems</h1>
                <br />
                <div class="Problems">
                {problems.map((problem) => (
                    <ProblemLabel key={problem.id} problem={problem} folderName={folderName}/>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Problems