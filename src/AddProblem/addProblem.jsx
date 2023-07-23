import React from 'react'
import ReactDOM from 'react-dom/client'

import './addProblem.css'
import { useState, useEffect } from 'react'
import { createProblem } from '../firebase.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProblemCreate />
  </React.StrictMode>
)
function ProblemCreate() {
    
    
    const [name, setName] = useState("")
    const [diff, setDiff] = useState("")
    const [instructions, setInstructions] = useState("")
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [example, setExample] = useState("")
    const [inputFile, setInputFile] = useState("")
    const [wordListFile, setWordListFile] = useState("")
    const [category, setCategory] = useState("")
    const [folder, setFolder] = useState("")

    function createProblemClick() {
        console.log("created problem", instructions)
        createProblem(folder, name, diff, instructions, input, output, example,inputFile, wordListFile,category)
        setName("")
        setDiff("")
        setInstructions("")
        setInput("")
        setOutput("")
        setExample("")
        setInputFile("")
        setWordListFile("")
        setCategory("")
        setFolder("")
    }

    const handleNameChange = (event) => {
      // 👇 Get input value from "event"
      setName(event.target.value);
    };
    const handleDiffChange = (event) => {
      // 👇 Get input value from "event"
      setDiff(event.target.value);
    };
    const handleInstructionsChange = (event) => {
      // 👇 Get input value from "event"
      setInstructions(event.target.value);
    };

    const handleInputChange = (event) => {
      // 👇 Get input value from "event"
      setInput(event.target.value);
    };

    const handleOutputChange = (event) => {
      // 👇 Get input value from "event"
      setOutput(event.target.value);
    };

    const handleExampleChange = (event) => {
      // 👇 Get input value from "event"
      setExample(event.target.value);
    };

    const handleInputFileChange = (event) => {
      // 👇 Get input value from "event"
      setInputFile(event.target.value);
    };

    const handleWordListFileChange = (event) => {
      // 👇 Get input value from "event"
      setWordListFile(event.target.value);
    };

    const handleCategoryChange = (event) => {
      // 👇 Get input value from "event"
      setCategory(event.target.value);
    };

    const handleFolderChange = (event) => {
      // 👇 Get input value from "event"
      setFolder(event.target.value);
    };


    return (
        <>      
       
        <div className="ProblemCreate" >
          <br />
           <label className='title'>Create Problem</label>
            <br />
            <br />
            <label htmlFor='problemName'>Problem Name</label>
            <input className='input' type="text" name="problemName" id='problemName' onChange={handleNameChange} value={name}/>
            <br />
            <label htmlFor='problemDifficulty'>Problem Difficulty</label>
            <input className='input' type="text" name="problemDifficulty" id='problemDifficulty' onChange={handleDiffChange} value={diff}/>
            <br />
            <label htmlFor='problemInstructions'>Problem Instructions</label>
            <textarea cols="30" rows="10" className='input' type="text" name="problemInstructions" id='problemInstructions' onChange={handleInstructionsChange} value={instructions}/>
            
            <br />
            <label htmlFor='problemInput'>Problem Input</label>
            <textarea cols="30" rows="10" className='input' type="text" name="problemInput" id='problemInput' onChange={handleInputChange} value={input}/>
            <br />
            <label htmlFor='problemOutput'>Problem Output</label>
            <textarea cols="30" rows="10" type="text" name="problemOutput" id='problemOutput' onChange={handleOutputChange} value={output}/>
            <br />
            <label htmlFor='problemExample'>Problem Example</label>
            <textarea cols="30" rows="10" className='input' type="text" name="problemExample" id='problemExample' onChange={handleExampleChange} value={example}/>  
            <br />
            <label htmlFor='problemInputFile'>Problem Input File</label>
            <input className='input' type="text" name="problemInputFile" id='problemInputFile' onChange={handleInputFileChange} value={inputFile}/>
            <br />
            <label htmlFor='problemWordListFile'>Word List File</label>
            <input className='input' type="text" name="problemWordListFile" id='problemWordListFile' onChange={handleWordListFileChange} value={wordListFile}/>
            <br />
            <label htmlFor='problemCategory'>Problem Category</label>
            <input className='input' type="text" name="problemCategory" id='problemCategory' onChange={handleCategoryChange} value={category}/>
            <br />
            <label htmlFor='problemFolder'>Problem Folders</label>
            <input className='input' type="text" name="problemFolder" id='problemFolder' onChange={handleFolderChange} value={folder}/>
            <br />
            <br />
            <button className='button' onClick={createProblemClick}>Create Problem</button>
        </div>
        
        
        </>
    )
}
export default ProblemCreate