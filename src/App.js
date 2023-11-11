import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login';
import Header from "./components/Header";
import Menu from "./components/Menu";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import UserLog from "./components/UserLog";
import Footer from "./components/Footer";

function App() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [loggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState("")

    useEffect(() => {
        // Fetch the user email and token from local storage
        const user = JSON.parse(localStorage.getItem("user"))
       // const user = localStorage.getItem("user")
        // If the token/email does not exist, mark the user as logged out
        if (!user || !user.accessToken) {
            setLoggedIn(false)
            return
        }

        // If the token exists, verify it with the auth server to see if it is valid
        fetch(apiUrl+"/auth/verify", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${user.accessToken}`,
            }
        })
            .then(r => r.json())
            .then(r => {
                console.log("refresh",r)
                setLoggedIn('success' === r.message)
                setUsername(user.username || "")
            })
    }, [])

    // Add a state to manage the login status
    //const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('isLoggedIn') === 'true');

    console.log("loggedIn", loggedIn)
    return (
        <div className="wrapper">
            {/*if loggedIn */}
            {loggedIn && <Header/>}
            {loggedIn && <Menu/>}
            {/*if not loggedIn */}
            <Routes>
                {/* if loggedIn not need show login page*/}
                <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
                <Route path="/" element={loggedIn ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/user" element={loggedIn ? <User /> : <Navigate to="/login" />} />
                <Route path="/userLog" element={loggedIn ? <UserLog /> : <Navigate to="/login" />} />
            </Routes>
            {loggedIn && <Footer/>}
        </div>
    );

}

export default App;