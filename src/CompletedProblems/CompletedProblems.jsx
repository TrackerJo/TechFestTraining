import { useState, useEffect } from 'react'
import '../App.css'
import ProblemLabel from '../ProblemLabel'
import { getCompletedProblems,isLoggedIn } from '../firebase.js'
import BackArrow from '../assets/back_arrow.png'

function Problems() {
    const [problems, setProblems] = useState([])
     //Get Folder name from url
     const urlParams = new URLSearchParams(window.location.search);
     const folderName = urlParams.get('folderName');
    useEffect(() => {
        // React advises to declare the async function directly inside useEffect
        async function getProblems() {
          
           console.log("Getting Problems")
           

          const problems =  await getCompletedProblems()
            console.log(problems,"Problems")
          setProblems(problems);
          
        };
        function checkLogin(){
            if(isLoggedIn() == 1){
                getProblems()
            }else{
                setTimeout(checkLogin,500)
            }
        }
    
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        
        checkLogin()
        
      }, []);

    function backToHome(e){
        window.location.href = '/TechFestTraining/'
    }
    return (
        <div className="ProblemList">
            <div>
                <img  src={BackArrow} className='backArrow' onClick={backToHome}></img>
                <h1>Completed Problems</h1>
                <br />
                <div class="Problems">
                    {problems.map((problem) => (
                        <ProblemLabel key={problem.id} problem={problem} folderName={problem.folderName}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Problems