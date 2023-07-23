import React from 'react'
import ReactDOM from 'react-dom/client'
import './Competition.css'
import { useState, useEffect } from 'react'
import { getCompStatus } from './firebase.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Competition />
  </React.StrictMode>
)

function Competition() {
    
    
  const [status, setStatus] = useState("")
  

    //get competition code parameter from url
    const urlParams = new URLSearchParams(window.location.search);
    const compCode = urlParams.get('compCode');
     //get playerID parameter from url
     const playerID = urlParams.get('playerID');

     useEffect(() => {
        // React advises to declare the async function directly inside useEffect
        async function getStatus() {
          
          const compStatus =  await getCompStatus(compCode, setStatus)
            console.log(compStatus)
          setStatus(compStatus);
          
        };
    
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        
            getStatus();
        
      }, []);

     
    
  
    if(status == "Waiting for participants"){
        return (
            <>      
            <div className="Competition" >
                <h1 className='waitingLabel'>Waiting for competition to start</h1>
                
            </div>
            
            
            </>
        )
    }
}
export default Competition