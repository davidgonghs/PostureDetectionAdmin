import React, { Component } from 'react';
import moment from 'moment';
import {Link} from "react-router-dom";

class FeedbackListCard extends Component {
    constructor(props) {
        super(props);
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.state = {
            feedbackData: [],
            currentPage: 1,
            totalPages: 1,
            refreshFeedbackList: this.props.isRefresh,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isRefresh !== this.props.isRefresh) {
            console.log('list refreshFeedbackList', this.props.isRefresh);
            console.log('list props isRefresh', this.props.isRefresh);
            if (this.props.isRefresh) {
                console.log('refresh FeedbackList', this.props.isRefresh);
                this.fetchFeedbackListData(this.state.currentPage);
                // Set isRefresh to false after fetching data
               // this.props.onRefreshComplete();
            }
        }
    }

    handleItemClick = (status) => {
        // Make a PATCH request to update the status
        this.updateStatus(status);
        // Call the parent component's callback function
        this.props.onItemClick();
    }


    componentDidMount() {
        // Fetch data for the initial page (e.g., page 1)
        this.fetchFeedbackListData(this.state.currentPage);
        console.log("list componentDidMount", this.state.refreshFeedbackList)
    }

    handleFeedbackListPageChange = (newPage) => {
        console.log("list 72", newPage)
        this.fetchFeedbackListData(newPage);
    }


    fetchFeedbackListData(page) {
        // Make a request to your API
        fetch(`${this.apiUrl}/feedback?page=${page}&pageSize=2`,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    feedbackData: data.data.feedback,
                    currentPage: data.data.page,
                    totalPages: data.data.totalPages,
                });
            })
            .catch((error) => {
                console.error('Error fetching feedback data:', error);
            });
    }



    updateStatus = (feedback) => {
        if(feedback.status === 0){
            const updateUrl = `${this.apiUrl}/feedback/update/${feedback.id}`;
            fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    id: feedback.id,
                    status: 1, // Update the status as needed (e.g., 1 for read)
                }),
            })
                .then(response => response.json())
                .then(data => {
                    // Handle success or error response as needed
                    console.log('Status updated successfully:', data);
                    this.fetchFeedbackData(this.state.currentPage);
                })
                .catch(error => {
                    // Handle error
                    console.error('Error updating status:', error);
                });
        }
    };


    renderTimeDifference(created_at, status) {

        switch (status){
            case 0:
                return {
                    text: `New : ${this.checkTimeDifference(created_at)}`,
                    badgeColor: 'badge-danger',
                };
            case 1:
                return {
                    text: `In Progress : ${this.checkTimeDifference(created_at)}`,
                    badgeColor: 'badge-info',
                };
            case 2:
                return {
                    text: `Closed`,
                    badgeColor: 'badge-success',
                };
        }

    }


    checkTimeDifference(created_at) {
        const now = moment();
        const createdAtMoment = moment(created_at);

        const diffInMinutes = now.diff(createdAtMoment, 'minutes');
        const diffInHours = now.diff(createdAtMoment, 'hours');
        const diffInDays = now.diff(createdAtMoment, 'days');

        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        } else {
            return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
        }
    }





    render() {
        let { feedbackData, currentPage, totalPages } = this.state;

        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">
                        <i className="ion ion-clipboard mr-1"/>
                        Feedback List
                    </h3>

                    <div className="card-tools">
                        <ul className="pagination pagination-sm">
                            <li className={`page-item ${currentPage == 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => this.handleFeedbackListPageChange(currentPage - 1)}
                                >
                                    «
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li
                                    key={index + 1}
                                    className={`page-item ${currentPage == index + 1 ? 'active' : ''}`}
                                >
                                    <button
                                        className={`page-link`}
                                        onClick={() => this.handleFeedbackListPageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage == totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => this.handleFeedbackListPageChange(parseInt(currentPage, 10) + 1)}
                                >
                                    »
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card-body">
                    <ul className="todo-list" data-widget="todo-list">
                        {feedbackData.map((feedback) => (
                            <li key={feedback.id}  className="todo-list-item" onClick={() => this.handleItemClick(feedback.status)} >
                            {/*<li key={feedback.id} className="todo-list-item">*/}
                                <Link to={`/feedback?itemId=${feedback.id}&currentPage=${currentPage}&status=${feedback.status}`}>
                                    <span className="text">{feedback.title}</span>
                                    <small className={`badge ${this.renderTimeDifference(feedback.created_at, feedback.status).badgeColor}`}>
                                        <i className="far fa-clock"/> {this.renderTimeDifference(feedback.created_at, feedback.status).text}
                                    </small>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default FeedbackListCard;
