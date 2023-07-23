 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 import {
    onSnapshot,getFirestore, doc, query,getDoc,setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, getDocs, where,arrayUnion
}
from "firebase/firestore"
import {
    getAuth,reauthenticateWithCredential,EmailAuthProvider,updatePassword, signOut, createUserWithEmailAndPassword, setPersistence, onAuthStateChanged ,signInWithEmailAndPassword, browserSessionPersistence, updateProfile
} from "firebase/auth";
import { getBase } from "./webSettings.js";
import { getStorage, ref,getDownloadURL } from "firebase/storage";
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyChHNrFJEwMncaywKIAJgmpFVfl3Lwsh3s",
    authDomain: "techfesttraining.firebaseapp.com",
    projectId: "techfesttraining",
    storageBucket: "techfesttraining.appspot.com",
    messagingSenderId: "475746553872",
    appId: "1:475746553872:web:23b4de0a4627201b223a95"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app)
 const auth = getAuth(app)
 const storage = getStorage(app);

 let loggedIn = -1;
 let loggingIn = false
    let user = null;

 export async function getProblemFolders(){
    
    const querySnapshot = await getDocs(collection(db, "ProblemFolders"));
    const map = querySnapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    });
    return map;
 }

 export async function getProblemsList(folderName){
    const folderDoc = doc(db, "ProblemFolders", folderName);
    const querySnapshot = await getDocs(collection(folderDoc, "Problems"));
    const map = querySnapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    });
    map.sort((a, b) => {
        return a.diffNum - b.diffNum;
    });
    return map;
 }

 export async function getProblem(folderName, problemName, callback){
    const folderDoc = doc(db, "ProblemFolders", folderName);
    var ref = doc(folderDoc, "Problems", problemName);
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
        callback(docSnap.data())
        return docSnap.data()
    } else{
        alert("Document doesn't exist")
        return "Failed"
    }
    
}

export async function getProblemsByName(name){
    const problemFolders = await getProblemFolders();
    let result = [];
    for(var i = 0; i < problemFolders.length; i++){
        const folder = doc(db, "ProblemFolders", problemFolders[i].id);
        const q = query(collection(folder, "Problems"), where("Name", "==", name));
        const querySnapshot = await getDocs(q); 
        let map = querySnapshot.docs.map(doc => doc.data());
        console.log(querySnapshot.docs.length)
        for (let index = 0; index < querySnapshot.docs.length; index++) {
            const doc = querySnapshot.docs[index];
            console.log(doc);
            map[index].id = doc.id;
            map[index].folder = problemFolders[i].id;
            
        }
        result.push(map);
    }
    let combined = [];
    for (let index = 0; index < result.length; index++) {
        combined = combined.concat(result[index]);
        
    }
    
    console.log(combined, "COMBINED")
    return combined;
     
}

export async function createFolder(name){
    await addDoc(collection(db, "ProblemFolders"), {
        Name: name
    })
}

export async function createProblem(folderName, name, diff, instructions,input, output, example,inputFile, wordlistFile,category){
    let q = query(collection(db, "ProblemFolders"), where("Name", "==", folderName));
    let querySnapshot = await getDocs(q); 
    if(querySnapshot.docs.length == 0){
        await createFolder(folderName);
        q = query(collection(db, "ProblemFolders"), where("Name", "==", folderName));
        querySnapshot = await getDocs(q); 
    }
    
    
    const folderID =  querySnapshot.docs[0].id;
    const folderDoc = doc(db, "ProblemFolders", folderID);
    const ref = collection(folderDoc, "Problems");
    let diffNum = 0;
    if(diff == "Easy"){
        diffNum = 1;
    }
    else if(diff == "Medium"){
        diffNum = 2;
    }
    else if(diff == "Hard"){
        diffNum = 3;
    }
    await addDoc(ref, {
        Name: name,
        Difficulty: diff,
        diffNum: diffNum,
        Instructions: instructions,
        Input: input,
        Output: output,
        Example: example,
        inputFile: inputFile,
        wordList: wordlistFile,
        Category: category
    })
}
export async function getProblemsByCategories(category){
    const problemFolders = await getProblemFolders();
    let result = [];
    for(var i = 0; i < problemFolders.length; i++){
        for(var j = 0; j < category.length; j++){
            const folder = doc(db, "ProblemFolders", problemFolders[i].id);
            const q = query(collection(folder, "Problems"), where("Category", "==", category[j]));
            const querySnapshot = await getDocs(q); 
            let map = querySnapshot.docs.map(doc => doc.data());
            console.log(querySnapshot.docs.length)
            for (let index = 0; index < querySnapshot.docs.length; index++) {
                const doc = querySnapshot.docs[index];
                console.log(doc);
                map[index].id = doc.id;
                map[index].folder = problemFolders[i].id;
                
            }
            result.push(map);
        }
    }

    let combined = [];
    for (let index = 0; index < result.length; index++) {
        combined = combined.concat(result[index]);
        
    }
    return combined;
        

}

export async function getProblemsByDifficulty(difficulty){
    const problemFolders = await getProblemFolders();
    let result = [];
    for(var i = 0; i < problemFolders.length; i++){
        const folder = doc(db, "ProblemFolders", problemFolders[i].id);
        const q = query(collection(folder, "Problems"), where("Difficulty", "==", difficulty));
        const querySnapshot = await getDocs(q); 
        let map = querySnapshot.docs.map(doc => doc.data());
        console.log(querySnapshot.docs.length)
        for (let index = 0; index < querySnapshot.docs.length; index++) {
            const doc = querySnapshot.docs[index];
            console.log(doc);
            map[index].id = doc.id;
            map[index].folder = problemFolders[i].id;
            
        }
        result.push(map);
    }

    let combined = [];
    for (let index = 0; index < result.length; index++) {
        combined = combined.concat(result[index]);
        
    }
    return combined;
        

}

export async function createMiniCompetition(compCode){
    await addDoc(collection(db, "MiniCompetitions"), {
        Code: compCode,
        Status: "Waiting for participants"
    })
}

export async function joinCompetition(code, name){
    let q = query(collection(db, "MiniCompetitions"), where("Code", "==", code));
    let querySnapshot = await getDocs(q); 
    if(querySnapshot.docs.length == 0){
        alert("Competition doesn't exist");
        return "bad code";
    }
    const compID =  querySnapshot.docs[0].id;
    const compDoc = doc(db, "MiniCompetitions", compID);
    const ref = collection(compDoc, "Participants");
    let qName = query(ref, where("Name", "==", name));
    let querySnapshotName = await getDocs(qName);
    if(querySnapshotName.docs.length > 0){
        alert("This name has already been taken");
        return "bad name";
    }
    await addDoc(ref, {
        Name: name
    })
    //get created doc
    qName = query(ref, where("Name", "==", name));
    querySnapshotName = await getDocs(qName);
    const docID = querySnapshotName.docs[0].id;
    return docID;
}

let numSubscriptions = 0;
export async function getParticipants(code, setParticipants, oldParticipants){
    
    //console.log(`getting participants for subscription ${numSubscriptions++}`)
    let q = query(collection(db, "MiniCompetitions"), where("Code", "==", code));
    let querySnapshot = await getDocs(q); 
    if (querySnapshot.docs.length == 0) {
        alert("Competition doesn't exist");
        return;
    }
    const compID =  querySnapshot.docs[0].id;
    const compDoc = doc(db, "MiniCompetitions", compID);
    const ref = collection(compDoc, "Participants");
    let Participants = [];
    
    onSnapshot(ref,(querySnapshot) => {
        console.log(`Listening for changes... for subscription ${numSubscriptions++}`)
       
        querySnapshot.docChanges().forEach((change) => {
           
            
            // A new transaction has been added
            if (change.type === 'added') {
                console.log(`Participant: ${change.doc.data().Name} has joined the competition`);
                Participants.push({id: change.doc.id, name: change.doc.data().Name});
            }
            

            setParticipants(Participants);
            
        })
    })
    
    
}

export async function changeCompSettings(code, settings){
    let q = query(collection(db, "MiniCompetitions"), where("Code", "==", code));
    let querySnapshot = await getDocs(q); 
    if(querySnapshot.docs.length == 0){
        alert("Competition doesn't exist");
        return;
    }
    const compID =  querySnapshot.docs[0].id;
    const compDoc = doc(db, "MiniCompetitions", compID);
    await updateDoc(compDoc, {
        Settings: settings
    })
}

export async function getCompStatus(compCode){
    let q = query(collection(db, "MiniCompetitions"), where("Code", "==", compCode));
    let querySnapshot = await getDocs(q); 
    if(querySnapshot.docs.length == 0){
        alert("Competition doesn't exist");
        return;
    }
    const compID =  querySnapshot.docs[0].id;
    const compDoc = doc(db, "MiniCompetitions", compID);
    const comp = await getDoc(compDoc);
    return comp.data().Status;
}

onAuthStateChanged(auth, user => {
    if (user) {
        console.log('user logged in: ', user);
        user = user;
        //Check if on login page
        if(window.location.href.includes("login.html") && !loggingIn){
            window.location.href = ""
        }
        loggedIn = 1;
       
       
        
        
    } else {
        console.log('user logged out');
        //Redirect to login page
        if(!window.location.href.includes("login") && !window.location.href.includes("friendLink")){
            window.location.href = getBase() + "login/"
        }
        loggedIn = 0;
    }
})


  export async function createUser(full_name, email, password, onLogin){
    const auth = getAuth();
    loggingIn = true;
    console.log("Emal: " + email + " Password: " + password)
    await createUserWithEmailAndPassword(auth,email, password)
    .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
            displayName: full_name
          }).then(() => {
            // Profile updated!
            AddDoc_CustomID(db,"users", {Name: full_name, Email: email},user.uid).then(() => {
                console.log("Account Created Successfully" + auth.currentUser.displayName)
                onLogin();
                loggingIn = false;
            })
        
        
            
            
          }).catch((error) => {
            // An error occurred
            alert("Error when updating profile. Look in console for more info.")
            console.log("Recieved error: " + error.message + " with error code " + error.code + " when updating profile.")
          });
       
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error when registering account. Look in console for more info.")
        console.log("Recieved error: " + errorMessage + " with error code " + errorCode + " when registering account.")
    });
    
}

export async function signIn(email, password, onLogin){
    const auth = getAuth();
    loggingIn = true;
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Signed in successfully")
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        onLogin()
        loggingIn = false;
        return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error when signing in. Look in console for more info.")
        console.log("Recieved error: " + errorMessage + " with error code " + errorCode + " when signing in.")
    });
}

export async function signOutUser(){
    const auth = getAuth();
    await signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Signed out successfully")
        
      }).catch((error) => {
        // An error happened.
        alert("Error when signing out. Look in console for more info.")
        console.log("Recieved error: " + error.message + " with error code " + error.code + " when signing out.")
      });
}

export async function AddDoc_CustomID(refDoc, collectionName, obj, name){
    var ref = doc(refDoc, collectionName, name);

    await setDoc(
        ref, obj
        
    )
    .then(() => {
        console.log("data added successfully")
    })
    .catch((error) => {
        console.log("unsuccessful operation, error: " + error);
    })
}

//Add Problem to completed problems collection
export async function addProblemToCompletedProblemsCollection(problemName, problemID, problemFolder){
    //Get user doc, then the completedProblems collection
    let userID = auth.currentUser.uid;
    let ref = doc(db, "users", userID);
    //Add problem to completed problems collection using AddDoc_CustomID
    await AddDoc_CustomID(ref, "CompletedProblems", {Name: problemName, ID: problemID, Folder: problemFolder}, problemID);
   
   

    
}

//Check if problem is in completed problems collection
export async function checkIfProblemIsInCompletedProblemsCollection(problemID){
    let authT = getAuth();
    let userID = authT.currentUser.uid;
    let ref = doc(db, "users", userID);
    let problemRef = doc(ref, "CompletedProblems", problemID);
    let problem = await getDoc(problemRef);
    if(problem.exists()){
        return true;
    }
    else{
        return false;
    }
}

//Get all completed problems
export async function getCompletedProblems(){
    
    let userID = auth.currentUser.uid;
    let ref = doc(db, "users", userID);
    let q = query(collection(ref, "CompletedProblems"));
    let querySnapshot = await getDocs(q);
    let completedProblems = [];
    querySnapshot.forEach((doc) => {
        let problem = {
            Folder: doc.data().Folder,
            id: doc.data().ID
        }
        completedProblems.push(problem);
    })
    //Loop through all docs and add problem to array
    let problems = [];
    var fillProblems = new Promise((resolve, reject) => {
        completedProblems.forEach(async (doc, index, array) => {
            let problem = await getProblem(doc.Folder, doc.id, (problem) => {});
            problem.id = doc.id;
            problem.folderName = doc.Folder;
            problems.push(problem);
            if(index === array.length -1 ){
                resolve()
            }
        });
    })
    await fillProblems;
        
    console.log(problems, "problems");
    return problems;
}

export function isLoggedIn(){
    console.log("Logged in: " + loggedIn)
    return loggedIn;
}

export async function getInputFileFromStorage(path, name){
    let fileRef = ref(storage,path);
    console.log(fileRef, "fileRef")
    await getDownloadURL(fileRef)
    // callback(url);
    .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
    
        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
            const blob = xhr.response;
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = name;
            link.click();
            URL.revokeObjectURL(link.href);
        };
        xhr.open('GET', url);
        xhr.send();
    })
    .catch(err => {
        // process exceptions
        console.log(err, "error")
    })
   
}

export async function getSolutionFromStorage(path){
    //Get the solution from storage
    //Return the solution as a string
    let fileRef = ref(storage,path);
    console.log(fileRef, "fileRef")
    let url = await getDownloadURL(fileRef);
    console.log(url, "url")
    let solution = await fetch(url);
    let solutionText = await solution.text();
    console.log(solutionText, "solutionText")
    return solutionText;
}

export async function getCodeFromStorage(path){
    //Get the code from storage
    //Return the code as a string
    let fileRef = ref(storage,path);
    console.log(fileRef, "fileRef")
    let url = await getDownloadURL(fileRef);
    console.log(url, "url")
    let code = await fetch(url);
    let codeText = await code.text();
    console.log(codeText, "codeText")
    return codeText;
}

export async function getFolderName(folderID){
    let folderRef = doc(db, "ProblemFolders", folderID);
    let folder = await getDoc(folderRef);
    return folder.data().Name;
}