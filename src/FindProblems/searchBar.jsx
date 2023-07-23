import { useState, useEffect } from 'react'
import '../App.css'




function SearchBar({searchType}) {
    
    if(searchType == "problemName"){
        return (
           <>
           <input type="text" id='search' class="name" placeholder="Problem Name"/> 
           </>
            
        
        )
    } 
    if (searchType == "problemCategory"){
        function dropDown(event) {
            const dropDown = document.querySelector('.dropdown')
            if(dropDown.classList.contains('hidden')){
                dropDown.classList.remove("hidden");
                dropDown.classList.add("visible");
            } else {
                dropDown.classList.remove("visible");
                dropDown.classList.add("hidden");
            }
        }
      

        return (
            <>
                <button onClick={dropDown} class="menu-btn" type="button">
                        Categories
                </button>
                <div className="dropdown hidden category" id="search">
                    <span class="menu-option"><label><input type="checkbox" />
                            Numbers</label></span>
                            <br />
                    <span class="menu-option"><label><input type="checkbox" />
                            Words</label></span>
                            <br />
                    <span class="menu-option"><label><input type="checkbox" />
                            Misc</label></span>
                            <br />
                    <span class="menu-option"><label><input type="checkbox" />
                            Integers</label></span>
                            <br />
                    <span class="menu-option"><label><input type="checkbox" />
                            Averages</label></span>
                            <br />
                    <span class="menu-option"><label><input type="checkbox" />
                            Triangles</label></span>
                            <br />
                    <span class="menu-option"><label><input type="checkbox" />
                            Print</label></span>
                            <br />
                    <span class="menu-option"><label><input type="checkbox" />
                            Medians</label></span>

                </div>
                
            </>
                
            )
    } 
     if(searchType == "problemDifficulty"){
        return (
        <select name="difficulty" class="difficultyChoice" id="search">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>

            </select>
        )
    }
    console.log(searchType)
}

export default SearchBar