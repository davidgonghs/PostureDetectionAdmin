import React, {Component} from 'react';
import {Link} from "react-router-dom";
export default class  SmallBoxesContent extends Component {

    constructor() {
        super();
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.state = {
            totalUser: 0,
            newUser: 0,
            activeUser: 0,
            feedback: 0
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const response = await fetch(`${this.apiUrl}/count`,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });
            const data = await response.json();

            if (response.ok) {
                this.setState({
                    feedback: data.data.feedback,
                    totalUser: data.data.totalUser,
                    newUser: data.data.newUser,
                    activeUser: data.data.activityUser
                });
            } else {
                console.error(`Failed to fetch feedback count. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching feedback count:', error);
        }
    };


    render() {
        return (
            <div className="row">
                {/* New Feedback */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-danger">
                        <div className="inner">
                            <h3>{this.state.feedback}</h3>
                            <p>New Feedback</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-chatbox-working" />
                        </div>
                        <Link to="/feedback" className="small-box-footer">
                            More info <i className="fas fa-arrow-circle-right" />
                        </Link>
                    </div>
                </div>
                {/* Total User */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{this.state.totalUser}</h3>
                            <p>Total Users</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person" />
                        </div>
                        <Link to="/user" className="small-box-footer">
                            More info <i className="fas fa-arrow-circle-right" />
                        </Link>
                    </div>
                </div>
                {/* Activity User */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>
                                {this.state.activeUser}
                            </h3>
                            <p>Today Activity  User</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-ios-pulse" />
                        </div>
                        <Link href="#" className="small-box-footer">
                            {/*More info <i className="fas fa-arrow-circle-right" />*/}
                        </Link>
                    </div>
                </div>
                {/* New User */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>{this.state.newUser}</h3>
                            <p>Today New Users</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person-add" />
                        </div>
                        <Link href="#" className="small-box-footer">
                            {/*More info <i className="fas fa-arrow-circle-right" />*/}
                        </Link>
                    </div>
                </div>

            </div>
        );

    }
}
