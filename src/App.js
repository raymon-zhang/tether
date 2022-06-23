import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore,
    limit,
    orderBy,
    query,
} from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDXOR82sAF64xL44BP7mkl6FMcyxU86f-c",
    authDomain: "tether-2781a.firebaseapp.com",
    projectId: "tether-2781a",
    storageBucket: "tether-2781a.appspot.com",
    messagingSenderId: "785492280537",
    appId: "1:785492280537:web:8b7fa1a5346491b6f86ac8",
    measurementId: "G-37B2ZG3ENB",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

function App() {
    const [user, loading] = useAuthState(auth);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (user) {
        return <ChatRoom />;
    }
    return <SignIn />;
}

function SignIn() {
    const signIn = () => {
        signInWithPopup(auth, new GoogleAuthProvider());
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    <button onClick={signIn}>Sign in with Google</button>
                </p>
            </header>
        </div>
    );
}

function SignOut() {
    const signOut = () => {
        auth.signOut();
    };

    return <button onClick={signOut}>Sign out</button>;
}

function ChatRoom() {
    const [messages, loading] = useCollection(
        query(
            collection(firestore, "messages"),
            orderBy("createdAt"),
            limit(25)
        )
    );
    const [message, setMessage] = useState("");
    const [user, setUser] = useAuthState(auth);

    const sendMessage = (event) => {
        event.preventDefault();
        addDoc(collection(firestore, "messages"), {
            message: message,
            user: user.displayName,
            createdAt: new Date(),
        });
        setMessage("");
    };

    console.log(messages);

    // component for chat messages that takes the text, user id, and photo url, and renders them, distinguishing whether it was sent or received
    const ChatMessage = ({ message, user, photoUrl }) => {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <img
                    src={photoUrl}
                    style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "10px",
                    }}
                />
                <div>
                    <div style={{ fontWeight: "bold" }}>{user}</div>
                    <div>{message}</div>
                </div>
            </div>
        );
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome {user.displayName}</h1>
                <SignOut />
            </header>
            <div className="messages">
                {messages &&
                    messages.docs.map((doc) => (
                        <ChatMessage key={doc.id} {...doc.data()} />
                    ))}
            </div>
            <form className="message-form">
                <input
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Type a message and hit ENTER"
                />
                <button onClick={sendMessage}>Send</button>
            </form>
        </div>
    );
}

export default App;
