import React, { Component } from 'react';

class User extends Component {
    constructor() {
        super();
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.state = {
            webUsers: [], // To store the fetched data
            currentPage: '1', // Initialize currentPage as a string
            totalPages: 1,
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


    handleView = (projectId) => {
        console.log(`View project with ID: ${projectId}`);
        // Add your logic for 'View' action here
    };

    handleEdit = (projectId) => {
        console.log(`Edit project with ID: ${projectId}`);
        // Add your logic for 'Edit' action here
    };

    handleDelete = (projectId) => {
        console.log(`Delete project with ID: ${projectId}`);
        // Add your logic for 'Delete' action here
    };

    render() {
        const { webUsers, currentPage, totalPages } = this.state;
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
                                                            <button className="btn btn-sm"
                                                                onClick={() => this.handleView(user.id)} >
                                                                <i className="fas fa-folder">
                                                                </i>
                                                                View
                                                            </button>
                                                            <button
                                                                className="btn btn-sm"
                                                                onClick={() => this.handleEdit(user.id)}
                                                            >
                                                                <i className="fas fa-pencil-alt">
                                                                </i>
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="btn btn-sm"
                                                                onClick={() => this.handleDelete(user.id)}
                                                            >
                                                                <i className="fas fa-trash">
                                                                </i>
                                                                Delete
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
            </div>
        );
    }
}

export default User;
