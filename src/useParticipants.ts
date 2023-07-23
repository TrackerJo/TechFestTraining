import { onSnapshot, doc, query, collection, getDocs, where, getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { useEffect, useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChHNrFJEwMncaywKIAJgmpFVfl3Lwsh3s",
  authDomain: "techfesttraining.firebaseapp.com",
  projectId: "techfesttraining",
  storageBucket: "techfesttraining.appspot.com",
  messagingSenderId: "475746553872",
  appId: "1:475746553872:web:23b4de0a4627201b223a95"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export type Participant = {
    id: number,
    name: string
}

export const useParticipants = (code: number) => {
    const [participants, setParticipants] = useState<Participant[]>([])

    useEffect(() => {
        let unsubscribed = false
        const isUnsubscribed = () => unsubscribed
        synchronizeParticipants(setParticipants, code, isUnsubscribed)
        return () => {unsubscribed = true}
    }, [])

    return participants 
}

const synchronizeParticipants = async (setParticipants: React.Dispatch<React.SetStateAction<any[]>>, code: number, isUnsubscribed: () => boolean) => {

    let q = query(collection(db, "MiniCompetitions"), where("Code", "==", code));
    let querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length == 0) {
        alert("Competition doesn't exist");
        return;
    }

    const compID =  querySnapshot.docs[0].id;
    const compDoc = doc(db, "MiniCompetitions", compID);
    const ref = collection(compDoc, "Participants");

    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
        if (isUnsubscribed()) {
            unsubscribe()
            return;
        }

        querySnapshot.docChanges().forEach((change) => {        
            // A new transaction has been added
            if (change.type === 'added') {
                const newParticipant = {id: change.doc.id, name: change.doc.data().Name}
                setParticipants(participants => [...participants, newParticipant]);
            }
        })
    })

}