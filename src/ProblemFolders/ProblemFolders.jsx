import { useState, useEffect } from 'react'
import '../App.css'
import ProblemFolder from '../ProblemFolder'
import { getProblemFolders } from '../firebase.js'
import BackArrow from '../assets/back_arrow.png'

function ProblemFolders() {
   
    const [folders, setFolders] = useState([])
    useEffect(() => {
        // React advises to declare the async function directly inside useEffect
        async function getFolders() {
          
          const problemFolders =  await getProblemFolders()
            
          setFolders(problemFolders);
          
        };
    
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        
            getFolders();
        
      }, []);
    //setFolders(problemFolders)
    
      function backToHome(e){
        window.location.href = '/'
      }

    return (
        <div className="App">
            <div>
            <img  src={BackArrow} className='backArrow' onClick={backToHome}></img>
                <h1>Problem Folders</h1>
                <br />
                <div class="Folders">
                {folders.map((folder) => (
                    <ProblemFolder key={folder.id} folder={folder}/>
                ))}
                </div>
            </div>
        </div>
    )
}

export default ProblemFolders