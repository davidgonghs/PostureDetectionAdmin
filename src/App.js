import Header from './components/Header';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import User from './components/User'
import Footer from './components/Footer';

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
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;