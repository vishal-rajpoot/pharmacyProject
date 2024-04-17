import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, getAuth, signInAnonymously } from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    doc,
    limit
} from 'firebase/firestore';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBMTrAkun4A0xF0CWgKb5PETpSIwdL2zO4",
    authDomain: "quantifine-pharmacy.firebaseapp.com",
    projectId: "quantifine-pharmacy",
    storageBucket: "quantifine-pharmacy.appspot.com",
    messagingSenderId: "339140717478",
    appId: "1:339140717478:web:efe5660398d963770abd67",
    measurementId: "G-BTY2SGS41P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);

const auth = getAuth(app);
signInAnonymously(auth)
    .then((r) => console.log())
    .catch(error => {
        this.setState({ errorMessage: error.message }, () => {
            ToastAndroid.show(this.state.errorMessage, ToastAndroid.SHORT);
        })
    });


async function sendMessage(roomId, user, text) {
    try {
        await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
            _id: new Date().getTime(),
            // displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp(),
            user: {
                name: user.displayName,
                _id: user.email
            }
        });
    }
    catch (error) {
        console.error(error);
    }

    try {
        const docRef = doc(db, 'chat-rooms', roomId)
        await setDoc(docRef, {
            readbypatient: false,
            timestamp: serverTimestamp(),
        }, 
        { 
            merge:true 
        })
    } catch (error) {
        console.error(error)
    }
}


function getMessages(roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'chat-rooms', roomId, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((x) => ({
                id: x.id,
                ...x.data(),
            }));
            callback(messages);
        }
    );
}


function getRooms(callback) {
    return onSnapshot(
        query(
            collection(db, 'chat-rooms')
        ),
        (querySnapshot) => {
            const rooms = querySnapshot.docs.map((x) => ({
                id: x.id,
                ...x.data(),
            }));

            callback(rooms);
        }
    );
}
export { db, sendMessage, getMessages, getRooms, auth, signInAnonymously };
