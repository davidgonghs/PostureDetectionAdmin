import React, {Component} from 'react'

class UserLog extends Component {

    constructor() {
        super();
        this.state = {
            userLogs: [], // To store the fetched data
        };
    }


    fetchData = (country) => {
        // Construct the URL with the selected country
        const apiUrl = `https://api.posturedetection.com/user-log`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Check if the response data is an array
                if (Array.isArray(data)) {
                    // Update the component's state with the fetched data
                    this.setState({ userLogs: data });
                } else {
                    // Handle the case where the response is not an array (error or unexpected response)
                    console.error('Unexpected response format:', data);
                    // You can choose to handle errors or unexpected responses here.
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                // Handle any fetch errors here.
            });
    };


    // handleCountryChange = (event) => {
    //     const selectedCountry = event.target.value;
    //     this.setState({ selectedCountry });
    //     this.fetchData(selectedCountry); // Fetch data based on the selected country
    // };
    render() {
        const { userLogs } = this.state;
        return (<div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark">UserLog</h1>
                                </div>
                                {/* /.col */}
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/#">Home</a></li>
                                        <li className="breadcrumb-item active">UserLog</li>
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
                                            <h3 className="card-title">User Log Table</h3>
                                        </div>
                                        <div className="card-body">
                                            <table className="table table-bordered">
                                                <thead>
                                                <tr>
                                                    <th>User Name</th>
                                                    <th>User Email</th>
                                                    <th>IP Address</th>
                                                    <th>Login Date</th>
                                                    <th>Platform</th>
                                                    <th>System</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {userLogs.map((logs) => (
                                                    <tr key={logs.user_id}>
                                                        <td>{logs.user_name}</td>
                                                        <td>{logs.user_email}</td>
                                                        <td>{logs.ip_address}</td>
                                                        <td>{logs.login_date}</td>
                                                        <td>{logs.platform}</td>
                                                        <td>{logs.system}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="card-footer clearfix">
                                            <ul className="pagination pagination-sm m-0 float-right">
                                                <li className="page-item"><a className="page-link" href="/#">«</a></li>
                                                <li className="page-item"><a className="page-link" href="/#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="/#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="/#">3</a></li>
                                                <li className="page-item"><a className="page-link" href="/#">»</a></li>
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
            </div>

        )
    }
}

export default UserLog;