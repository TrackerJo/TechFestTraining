import { useState, useEffect } from 'react'
import { getCodeFromStorage} from '../firebase.js'
import { checkFiles } from '../fileChecking.js'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('java', java);

import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


function Solution({lang, problem, folderName}) {
    
       const [codeLines, setCodeLines] = useState("")
        useEffect(() => {
            async function getSolutionInfo() {
         
                console.log(folderName, "FOLDER NAME")
                console.log(problem, "PROBLEM")
                let code = await getCodeFromStorage(folderName + "/" + "Code/" + problem + " Code "+ lang + ".txt")
                console.log(code, "CODE")
                setCodeLines(code)
            }

            //Wait for problem to be set
            if(problem != undefined){
                getSolutionInfo();
            }
            //getSolutionInfo()
        }, [folderName])
        
        return (
            codeLines == "" ? <div className='code'>No Solution Yet!</div> :
            <div className='code'>
               {/* <pre><code> {codeLines}</code></pre> */}
               <SyntaxHighlighter language="java" style={a11yDark} customStyle={{borderRadius: "5px"}}>
                    {codeLines}
                </SyntaxHighlighter>
            </div>
        )
    
}

export default Solution