import React, { Component } from 'react';
import moment from 'moment';

class FeedbackListCard extends Component {
    constructor(props) {
        super(props);
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.state = {
            feedbackData: [],
            currentPage: 1,
            totalPages: 1,
        };
    }

    handleItemClick = (feedback, currentPage) => {
        // Make a PATCH request to update the status
        this.updateStatus(feedback);
        // Call the parent component's callback function
        this.props.onItemClick(feedback.id, currentPage);

    }

    componentDidMount() {
        if(this.props.isRefrsh){
            this.fetchFeedbackData(this.state.feedbackListPage);
        }else{
            // Fetch data for the initial page (e.g., page 1)
            this.fetchFeedbackData(this.state.currentPage);
        }
    }

    fetchFeedbackData(page) {
        // Make a request to your API
        fetch(`${this.apiUrl}/feedback?page=${page}&pageSize=2`)
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

    handlePageChange(newPage) {
        console.log('New page:', newPage);
        this.fetchFeedbackData(newPage);

    }

    updateStatus = (feedback) => {
        if(feedback.status === 2){
            return;
        }
        const updateUrl = `${this.apiUrl}/feedback/${feedback.id}`;

        fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
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
            })
            .catch(error => {
                // Handle error
                console.error('Error updating status:', error);
            });
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
                                    onClick={() => this.handlePageChange(currentPage - 1)}
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
                                        onClick={() => this.handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage == totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => this.handlePageChange(parseInt(currentPage, 10) + 1)}
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
                            <li key={feedback.id} onClick={() => this.handleItemClick(feedback, currentPage)} >
                                <span className="text">{feedback.title}</span>
                                <small className={`badge ${this.renderTimeDifference(feedback.created_at, feedback.status).badgeColor}`}>
                                    <i className="far fa-clock"/> {this.renderTimeDifference(feedback.created_at, feedback.status).text}
                                </small>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default FeedbackListCard;
