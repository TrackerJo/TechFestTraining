import { useState, useEffect } from 'react'
import { getProblem, getInputFileFromStorage,checkIfProblemIsInCompletedProblemsCollection, addProblemToCompletedProblemsCollection, getSolutionFromStorage, getFolderName } from '../firebase.js'
import { checkFiles } from '../fileChecking.js'
import Solution from './Solution'
import BackArrow from '../assets/back_arrow.png'
import Checkmark from '../assets/green_checkmark.png'


function Problem() {
    const [problem, setProblem] = useState({})
    const [lang, setLang] = useState("Java")
    const [completed, setCompleted] = useState(false)
    const [inputContent, setInputContent] = useState("")
    const [inputName, setInputName] = useState("")
    const [folderName, setFolderName] = useState("")
    //Get Folder name from url
    const urlParams = new URLSearchParams(window.location.search);
    const problemID = urlParams.get('problem');
    //Get problem name from url
    const folderID = urlParams.get('folderName');
    useEffect(() => {
        // React advises to declare the async function directly inside useEffect
        async function getProblemInfo() {
          
            const problemTemp =  await getProblem(folderID, problemID, getFileFromStorage)
            setProblem(problemTemp)
            const folderName = await getFolderName(folderID);
            setFolderName(folderName)
            
            
             // console.log(loadFile(problemInput))
            
             //console.log(typeof inputName)
            
        };

        async function getFileFromStorage(problemT){
            console.log(problemT, "TEMP PROBLEM")
            setInputName(problemT.Name  + " Input.txt")
            console.log(inputName, "INPUT NAME")
            
            let isCompleted = await checkIfProblemIsInCompletedProblemsCollection(problemT.Name);
            setCompleted(isCompleted)
        }
      
    
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        
            getProblemInfo();
        
      }, []);

    function handleUploadFile(e){
        const fileUpload = document.getElementById('outputUpload')
        //console.log(checkFiles('/problemSolutions/01-Getting Started.txt', fileUpload.files[0].path))
        const reader = new FileReader()
        reader.onload = checkFile;
        reader.readAsText(fileUpload.files[0])
    }

    async function checkFile(event){
        let Uploaded = event.target.result
        //let Solution = loadFile("../problemSolutions/" + problem.Name  + " Solution.txt")
        let Solution = await getSolutionFromStorage(folderName + "/Solutions/" + problem.Name  + " Solution.txt")
       // let Solution = loadFile("../problemSolutions/Getting Started Solution.txt")
        console.log(Uploaded.length)
        console.log(Solution.length)
        
        if(Uploaded.replace(/\s+/g, "") == Solution.replace(/\s+/g, "")){
            alert("Correct")
            addProblemToCompletedProblemsCollection(problem.Name, problemID, folderID)
        } else{
            alert("Incorrect")
        }
        
    }

    function loadFile(filePath) {
        var result = null;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", filePath, false);
        xmlhttp.send();
        if (xmlhttp.status==200) {
          result = xmlhttp.responseText;
          console.log(typeof result)
        }
        return result;
      }

    async function downloadInput(e){
        console.log(problem.inputFile)
        if(problem.inputFile != "" && problem.inputFile != "wordlist.txt"){
            console.log(inputName, "INPUT NAME")
            let path = folderName + "/Inputs/" + inputName;
            console.log(path)
            await getInputFileFromStorage(path, inputName)
        }
        if(problem.wordList != "" || problem.inputFile == "wordlist.txt"){
            console.log(problem.wordList)
            let path = folderName + "/Inputs/" + "wordlist.txt";
            await getInputFileFromStorage(path, "wordlist.txt")
            let wlink = document.createElement('a');
            wlink.href = "src/problemInputs/wordlist.txt";
            wlink.download = problem.wordList;
            document.body.appendChild(wlink);
            wlink.click();
            document.body.removeChild(wlink);
        }
    }

    function backToProblems(e){
        window.location.href = "/TechFestTraining/Problems/?folderName=" + folderID
    }

    function viewSolution(e){
        const solutionDiv = document.querySelector('.Solution')
        if(solutionDiv.classList.contains('hideSolution')){
            solutionDiv.classList.remove('hideSolution')
            solutionDiv.classList.add('showSolution')
        } else if(solutionDiv.classList.contains('showSolution')){
            solutionDiv.classList.add('hideAnimSolution')
            solutionDiv.classList.remove('showSolution')
        }else if(solutionDiv.classList.contains('hiddenSolution')){
            solutionDiv.classList.remove('hiddenSolution')
            solutionDiv.classList.add('showSolution')
        }
    }

    function animationEnded(){
        const solutionDiv = document.querySelector('.Solution')
        if(solutionDiv.classList.contains('hideAnimSolution')){
            solutionDiv.classList.add('hideSolution')
            solutionDiv.classList.remove('hideAnimSolution')
        }
    }
    
    function changeLang(e){
        setLang(e.target.dataset.section)
        document.querySelector('.active').classList.remove('active')
        e.target.classList.add('active')
    }

    return (
        <div className='ViewProblem'>
            <div className='Problem'>
                <br />
                <img  src={BackArrow} className='backArrow' onClick={backToProblems}></img><label className='title'>{problem.Name}</label>
                {completed ? <img src={Checkmark} className='checkmark'></img> : <div></div>}
                <label>{problem.Difficulty}</label>
                <div className='problemInfo'>
                    <p>{problem.Instructions}</p>          
                    <p>{problem.Input}</p>
                    <p>{problem.Output}</p>
                    <pre><p className="example">{problem.Example}</p></pre>
                </div>
                <button className="downloadInputBtn" onClick={downloadInput} href={inputContent}>Download Input</button>
                <label htmlFor="outputUpload" className="uploadOutputBtn">Upload Output to Check</label>
                <input id="outputUpload" style={{visibility:'hidden'}} type="file" accept='.txt' onChange={handleUploadFile}></input>
                <button className="viewSolutionBtn" onClick={viewSolution}>View Solution</button>
                
            </div>
            <div className='Solution hiddenSolution' onAnimationEnd={animationEnded}>
                <h1>Solution</h1>
                <section class="topnav" id="sectionSelector">
                    <a class="active sectionLink" data-section="Java" onClick={changeLang}>Java</a>
                    <a class="sectionLink" data-section="JavaScript" onClick={changeLang}>JavaScript</a>
                    
                </section>
                <br />
                <Solution lang={lang} problem={problem.Name} folderName={folderName}/>
            </div>
        </div>
        
    )
}

export default Problem
