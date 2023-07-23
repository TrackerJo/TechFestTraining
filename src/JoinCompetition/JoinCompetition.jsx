import React from 'react'
import ReactDOM from 'react-dom/client'
import './JoinCompetition.css'
import { useState, useEffect } from 'react'
import { joinCompetition } from './firebase.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <JoinComp />
  </React.StrictMode>
)

function JoinComp() {
    
    
    const [code, setCode] = useState("")
    const [name, setName] = useState("")


    function handleCodeChange(event) {
        setCode(event.target.value)
    }

    function handleNameChange(event) {
        setName(event.target.value)
    }

    async function handleJoinClick() {
       let code = document.getElementById("code")
        let name = document.getElementById("name")
        let id = await joinCompetition(code.value, name.value)
        if(id == "bad code"){
          code.value = ""

        } else if(id == "bad name"){
          name.value = ""
        }
        else{
          //redirect to competition page
          window.location.href = "/competition.html?compCode=" + code.value + "&playerID=" + id
         }
         
         
      }
  

  return (
      <>      
      <div className="JoinComp" >
        <h1>Join Competition</h1>
        <input type="text" placeholder='Competition Code' id="code" onSubmit={handleCodeChange}/>
        <br />
        <input type="text" placeholder='Display Name' id="name" onSubmit={handleNameChange}/>
        <br />
        <button onClick={handleJoinClick}>Join Competition</button>
      </div>
      
      
      </>
  )
  
}
export default JoinComp