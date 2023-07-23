import React from 'react'
import ReactDOM from 'react-dom/client'
import './findProblems.css'
import { useState, useEffect } from 'react'
import { getProblemsByName, getProblemsByCategories, getProblemsByDifficulty } from '../firebase.js'
import ProblemLabel from '../ProblemLabel'
import SearchBar from './searchBar'
import BackArrow from '../assets/back_arrow.png'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProblemSearch />
  </React.StrictMode>
)

function ProblemSearch() {
    
    
    const [problems, setProblems] = useState([])
    const [searchType, setSearchType] = useState("problemName")



    async function searchFor(e){
       const search = document.getElementById('search')
       console.log(search.className)
       if(search.className == "name"){
           console.log("name")
           const problems = await getProblemsByName(search.value)
           setProblems(problems)
       }
         if(search.classList.contains("category")){
              console.log("category")
              const checkboxs = search.getElementsByTagName('input')
              let categories = [];
                for(let i = 0; i < checkboxs.length; i++){
                    if(checkboxs[i].checked){
                        categories.push(checkboxs[i].parentNode.textContent)
                    }
                }
                console.log(categories)
            const problemsR = await getProblemsByCategories(categories)
            setProblems(problemsR)
            
        }
        if(search.className == "difficultyChoice"){
            console.log("difficulty")
            const problems = await getProblemsByDifficulty(search.value)
            setProblems(problems)
        }
        

    }

    function handleSearchByChange(e){
        setSearchType(e.target.value)
    }

    function backToHome(e){
        window.location.href = '/TechFestTraining/'
      }


    return (
        <>      
        <div class="ProblemSearch" >
        <img  src={BackArrow} className='backArrow' onClick={backToHome}/><h1>Search for Problem</h1>
                <br />
            <select name="searchBy" id="searchBy" onChange={handleSearchByChange}>
                <option value="problemName">Problem Name</option>
                <option value="problemCategory">Problem Category</option>
                <option value="problemDifficulty">Problem Difficulty</option>

            </select>
            <SearchBar searchType={searchType}/><button id="searchBtn" onClick={searchFor}>Search</button>
            <h2>Search Results</h2>
            <div class="searchResults">
                
                {console.log(problems, "PROBLEMS")}
                {problems.map((problem) => (
                    console.log(problem),
                    <ProblemLabel key={problem.id} problem={problem} folderName={problem.folder}/>
                ))}
            </div>
        </div>
        
        
        </>
    )
    
}
export default ProblemSearch