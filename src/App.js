import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';

import Dashboard from './components/Dashboard';
import User from './components/User'
import UserLog from './components/UserLog'


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div class="wrapper">
            <Header/>
            <Menu/>
            <Routes>
                <Route exact path="/" element={<Dashboard/>} />
                <Route path="/user" element={<User/>} />
                <Route path="/userLog" element={<UserLog/>} />
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;