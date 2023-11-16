import React, { Component } from 'react';
import PopupUser from "./PopupUser";
import PopupResetPassword from "./PopupResetPassword";

class User extends Component {
    constructor() {
        super();
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.state = {
            webUsers: [], // To store the fetched data
            currentPage: '1', // Initialize currentPage as a string
            totalPages: 1,
            searchQuery: '', // Add searchQuery state
            isPopupOpen: false, // New state to manage the visibility of the popup form
            isResetPasswordPopupOpen: false,
            popupMode: 'add', // 'add', 'edit', or 'view'
            selectedUser: null,
        };
    }

    componentDidMount() {
        this.fetchData(this.state.currentPage);
    }

    fetchData = (page) => {
        // Construct the URL with the selected page
        fetch(`${this.apiUrl}/user?page=${page}&pageSize=2`,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => response.json())
            .then((data) => {
                // Check if the response data is an object with the expected structure
                if (data.status === 200 && data.data) {
                    // Update the component's state with the fetched data
                    this.setState({
                        webUsers: data.data.webUsers,
                        currentPage: data.data.page,
                        totalPages: data.data.totalPages,
                    });
                } else {
                    // Handle the case where the response is not as expected
                    console.error('Unexpected response format:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    handlePageChange = (newPage) => {
        this.fetchData(newPage);
    };


    handlePopupUser = (mode,user=null) => {
        this.setState({ isPopupOpen: true, popupMode: mode, selectedUser: user });
        console.log('mode',mode)
        // if (projectId === 0)
        //     console.log('add')
    };


    handleDelete = (userId) => {
        console.log(`Delete project with ID: ${userId}`);
        // Add your logic for 'Delete' action here
        //show window confirm
        if (window.confirm("Are you sure you want to delete this user?")) {
            fetch(`${this.apiUrl}/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    // Check if the response data is an object with the expected structure
                    if (data.status === 200) {
                        // Update the component's state with the fetched data
                        this.fetchData(this.state.currentPage);
                    } else {
                        // Handle the case where the response is not as expected
                        console.error('Unexpected response format:', data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }

    };

    handleSubmitUser = (formData) => {
        // Add logic for handling the new user data (e.g., API call)
        console.log('New user data:', formData);

        // Close the popup form after submission
        this.setState({ isPopupOpen: false, isResetPasswordPopupOpen: false });
    };



    handleSearchChange = (event) => {
        // Update searchQuery state when the search input changes
        this.setState({ searchQuery: event.target.value });
    };

    handleSearch = () => {
        // Trigger a new fetch with the search query
        this.fetchData(this.state.currentPage, this.state.searchQuery);
    };


    handleCancel = () => {
        this.setState({
            isPopupOpen: false,
            isResetPasswordPopupOpen: false,
        });
    };

    handlePopupResetPassword = (user) => {
        this.setState({ isResetPasswordPopupOpen: true, selectedUser: user });
    }



    render() {
        const { webUsers, currentPage, totalPages, searchQuery, isPopupOpen, isResetPasswordPopupOpen, selectedUser, popupMode   } = this.state;
        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark">User</h1>
                                </div>
                                {/* /.col */}
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                                        <li className="breadcrumb-item active">User</li>
                                    </ol>
                                </div>
                                {/* /.col */}
                            </div>
                            {/* /.row */}
                        </div>
                        {/* /.container-fluid */}
                    </div>
                    {/* /.content-header */}
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">

                            {/* Main row */}
                            <div className="row">
                                <section className="col-lg-12 connectedSortable">
                                    {/* Custom tabs (Charts with tabs)*/}
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">User Table</h3>
                                            <div className="card-tools">
                                                <div className="input-group input-group-sm" style={{ width: '150px' }}>
                                                    <input
                                                        type="text"
                                                        name="table_search"
                                                        className="form-control float-right"
                                                        placeholder="Search By Email"
                                                        value={searchQuery}
                                                        onChange={this.handleSearchChange}
                                                    />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-default" onClick={this.handleSearch}>
                                                            <i className="fas fa-search" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <table className="table table-bordered">
                                                <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Email</th>
                                                    <th>Username</th>
                                                    <th>Image</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {webUsers.map((user) => (
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.username}</td>
                                                        <td>
                                                            <img
                                                                src={user.img}
                                                                alt={`Avatar for ${user.username}`}
                                                                style={{ width: '50px', height: '50px' }}
                                                            />
                                                        </td>
                                                        <td className="project-actions text-right">
                                                            <button className="btn btn-primary btn-sm"
                                                                onClick={() => this.handlePopupUser('view',user)}
                                                                    data-toggle="modal"
                                                                    data-target="#modal-lg"
                                                            >
                                                                <i className="fas fa-folder">
                                                                </i>
                                                                View
                                                            </button>
                                                            <button
                                                                className="btn btn-info btn-sm"
                                                                onClick={() => this.handlePopupUser('edit',user)}
                                                                data-toggle="modal"
                                                                data-target="#modal-lg"
                                                            >
                                                                <i className="fas fa-pencil-alt">
                                                                </i>
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => this.handleDelete('delete', user.id)}
                                                            >
                                                                <i className="fas fa-trash">
                                                                </i>
                                                                Delete
                                                            </button>
                                                            <button
                                                                className="btn btn-warning btn-sm"
                                                                onClick={() => this.handlePopupResetPassword(user)}
                                                                data-toggle="modal"
                                                                data-target="#resetPasswordModal"
                                                            >
                                                                <i className="fas fa-lock">
                                                                </i>
                                                                Reset password
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="card-footer clearfix">
                                            <ul className="pagination pagination-sm m-0 float-right">
                                                <li className="page-item">
                                                    <button
                                                        className="page-link"
                                                        onClick={() => this.handlePageChange(parseInt(currentPage, 10) - 1)}
                                                        disabled={currentPage === '1'}
                                                    >
                                                        «
                                                    </button>
                                                </li>
                                                {[...Array(totalPages).keys()].map((page) => (
                                                    <li key={page + 1} className={`page-item ${currentPage == page + 1 ? 'active' : ''}`}>
                                                        <button
                                                            className={`page-link`}
                                                            onClick={() => this.handlePageChange(page + 1)}
                                                        >
                                                            {page + 1}
                                                        </button>
                                                    </li>
                                                ))}
                                                <li className="page-item">
                                                    <button
                                                        className="page-link"
                                                        onClick={() => this.handlePageChange(parseInt(currentPage, 10) + 1)}
                                                        disabled={currentPage === totalPages.toString()}
                                                    >
                                                        »
                                                    </button>
                                                </li>
                                            </ul>
                                            <button className="btn btn-success float-left"
                                                    onClick={()=>this.handlePopupUser('add')}
                                                    data-toggle="modal"
                                                    data-target="#modal-lg"
                                            >
                                                Add User
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            {/* /.row (main row) */}
                        </div>
                        {/* /.container-fluid */}
                    </section>
                    {/* /.content */}
                </div>
                {/* ... (your existing code) ... */}

                {isPopupOpen && (
                    <PopupUser
                        mode={popupMode}
                        user={selectedUser}
                        onSubmit={this.handleSubmitUser}
                        onCancel={this.handleCancel}
                    />
                )}

                {isResetPasswordPopupOpen && (
                    <PopupResetPassword
                        user={selectedUser}
                        onSubmit={this.handleSubmitUser}
                        onCancel={this.handleCancel}
                    />
                )}


            </div>
        );
    }
}

export default User;
