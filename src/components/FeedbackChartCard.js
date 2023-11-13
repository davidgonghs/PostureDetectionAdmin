import React, {Component} from 'react';
import moment from 'moment';

class FeedbackChartCard extends Component {
    constructor(props) {
        super(props);
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.state = {
            feedbackData: [],
            parentId: this.props.parentId,
        };
    }



    componentDidMount() {
        // Fetch data when the component mounts
        this.fetchFeedbackData(this.props.parentId); // Use the parentId passed as a prop
    }

    componentDidUpdate(prevProps) {
        // Fetch data if parentId prop is updated
        if (this.props.parentId !== prevProps.parentId) {
            this.fetchFeedbackData(this.props.parentId);
        }
    }

    fetchFeedbackData = async (parentId) => {
        try {
            // Make a request to your API with the parentId
            const response = await fetch(`${this.apiUrl}/feedback/parent/${parentId}`);
            const data = await response.json();

            // Update state with the fetched data
            this.setState({ feedbackData: data.data });

        } catch (error) {
            console.error('Error fetching feedback data:', error);
        }
    };

    handleStatusUpdate = () => {
        // Add logic to make a PATCH request to update feedback status to 2
        const feedbackId = this.props.parentId; // Replace with the actual feedback ID
        fetch(`${this.apiUrl}/feedback/${feedbackId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: feedbackId,
                status: 2
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response, you may update state or perform other actions
                console.log('Feedback status updated:', data);
            })
            .catch(error => {
                console.error('Error updating feedback status:', error);
            });
    };



    renderMessages() {
        const { feedbackData } = this.state;
        return feedbackData.map((feedback) => {
            const isSentByAdmin = feedback.admin_id !== 0; // Assuming admin_id 1 represents an admin user

            return (
                <div key={feedback.id} className={`direct-chat-msg ${isSentByAdmin ? 'right' : ''}`}>
                    <div className="direct-chat-infos clearfix">
            <span className={`direct-chat-name float-${isSentByAdmin ? 'right' : 'left'}`}>
              {isSentByAdmin ? feedback.admin_username : feedback.user_username}
            </span>
                        <span className={`direct-chat-timestamp float-${isSentByAdmin ? 'left' : 'right'}`}>
              {moment(feedback.created_at).format('DD MMM h:mm a')}
            </span>
                    </div>
                    <img
                        className="direct-chat-img"
                        src={isSentByAdmin ? feedback.admin_img : feedback.user_img}
                        alt={isSentByAdmin ? 'Admin' : 'User'}
                    />
                    <div className="direct-chat-text">{feedback.content}</div>
                </div>
            );
        });
    }



    render() {
        const { feedbackData } = this.state;
        return (
            <div className="card direct-chat direct-chat-primary">
                <div className="card-header">
                    <h3 className="card-title">Feedback Chat</h3>
                    <div className="card-tools">
      <span title="3 New Messages" className="badge badge-primary">
        {feedbackData.length}
      </span>
                        <button
                            type="button"
                            className="btn btn-tool"
                            data-card-widget="collapse"
                        >
                            <i className="fas fa-minus"/>
                        </button>
                        <button
                            type="button"
                            className="btn btn-tool"
                            title="Done"
                            data-widget="chat-pane-toggle"
                            onClick={this.handleStatusUpdate()}
                        >
                            <i className="fas fa-check-circle"/>
                        </button>
                    </div>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                    {/* Conversations are loaded here */}
                    <div className="direct-chat-messages">
                        {this.renderMessages()}
                    </div>
                    {/*/.direct-chat-messages*/}
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                    <form action="#" method="post">
                        <div className="input-group">
                            <input
                                type="text"
                                name="message"
                                placeholder="Type Message ..."
                                className="form-control"
                            />
                            <span className="input-group-append">
          <button type="button" className="btn btn-primary">
            Send
          </button>
        </span>
                        </div>
                    </form>
                    <br/>

                </div>
                {/* /.card-footer*/}
            </div>

        );
    }
}

export default FeedbackChartCard;
