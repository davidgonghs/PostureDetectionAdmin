import React, {Component} from 'react';
import moment from 'moment';

class FeedbackChartCard extends Component {
    constructor(props) {
        super(props);
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.state = {
            feedbackData: [],
            parentId: this.props.parentId,
            status: this.props.status,
            key: true
        };
    }



    componentDidMount() {
        // Fetch data when the component mounts
        console.log('fc 21')
        this.handleChange();
        this.fetchFeedbackData(this.state.parentId).then(); // Use the parentId passed as a prop
    }

    componentDidUpdate(prevProps) {
        if (this.props.parentId !== prevProps.parentId) {
            this.handleChange();
            this.fetchFeedbackData(this.props.parentId); // Use the parentId passed as a prop
        }
    }

    handleChange() {
        const queryString = window.location.search;
        console.log('feedbackChartCard handleChange',queryString)
        if(queryString.length === 0){
            console.log("fc init")
            this.setState({
                parentId: 0,
                status: 0,
                key: true
            })
            return;
        }
        const urlParams = new URLSearchParams(queryString);
        const itemId = urlParams.get('itemId');
        const status = urlParams.get('status');
        let key = false;
        if (status === 2 || status === "2" || status === null){
            key = true;
        }
        this.setState({
            feedbackData: [],
            parentId: itemId,
            status: status,
            key: key
        })
    }

    fetchFeedbackData = async (parentId) => {
        if(parentId === 0){
            return;
        }
        try {
            // Make a request to your API with the parentId
            const response = await fetch(`${this.apiUrl}/feedback/parent/${parentId}`,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });
            const data = await response.json();

            // Update state with the fetched data
            this.setState({ feedbackData: data.data });
        } catch (error) {
            console.error('Error fetching feedback data:', error);
        }
    };

    handleStatusUpdate = (statusValue) => {
        // Add logic to make a PATCH request to update feedback status to 2
        const feedbackId = this.props.parentId; // Replace with the actual feedback ID
        fetch(`${this.apiUrl}/feedback/update/${feedbackId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                id: feedbackId,
                status: +statusValue
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response, you may update state or perform other actions
             //   console.log('Feedback status updated:', data);
                let key = false;
                if (statusValue === 2 || statusValue === "2" || statusValue === null){
                    key = true;
                }
                this.setState({
                    key: key,
                    status: statusValue
                })
                console.log('fb chart onRefresh')
                this.props.onRefresh();
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


    renderHeader() {
        const { feedbackData, status } = this.state;
        console.log('fc')
        console.log(status)
        const hidden = status !== 2;
        console.log(hidden)
        return(
            <>
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
                        hidden={ status == 1 || status == 0}
                        type="button"
                        className="btn btn-tool"
                        title="Done"
                        onClick={() =>this.handleStatusUpdate(2)}
                    >
                        <i className="fas fa-check-circle"/>
                    </button>

                    <button
                        hidden={ status == 2}
                        type="button"
                        className="btn btn-tool"
                        title="ReOpen"
                        onClick={() =>this.handleStatusUpdate(1)}
                    >
                        <i className="fas fa-undo"/>
                    </button>

                </div>
            </>

            );

    }



    render() {
        const { status } = this.state;

        return (
            <div className="card direct-chat direct-chat-primary">
                <div className="card-header">
                    {this.renderHeader()}
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
          <button type="button" className="btn btn-primary"  disabled={this.state.key}>
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
