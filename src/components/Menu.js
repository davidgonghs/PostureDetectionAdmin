import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

// Import your other components or pages here
import Dashboard from './Dashboard'; // Import your Dashboard component
import User from './User'; // Import your User component

export default class Menu extends Component {
    render() {
        return (
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="index.html" className="brand-link">
                        <img src="dist/img/logo.jpg" alt="PostureDetection Logo"
                             className="brand-image" />
                        <span className="brand-text font-weight-light">PostureDetection</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2.png" className="img-circle elevation-2 elevation-3"
                                     alt="User Image"/>
                            </div>
                            <div className="info">
                                <a href="/#" className="d-block">David Gong</a>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                                data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
                                <li className="nav-item">
                                    <Link to="/" className="nav-link ">
                                        <i className="nav-icon fas fa-tachometer-alt"/>
                                        <p>
                                            Dashboard
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link  to="/user" className="nav-link">
                                        <i className="nav-icon fas fa-user"/>
                                        <p>
                                            User
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
        )
    }
}