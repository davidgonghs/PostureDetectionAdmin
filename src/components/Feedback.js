import React, { Component } from 'react';
import FeedbackListCard from "./FeedbackListCard";
import FeedbackChartCard from "./FeedbackChartCard";

class Feedback extends Component {
    constructor() {
        super();
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.state = {
            selectedParentId: null,
            refreshFeedbackList: false,
            feedbackListPage: 1,
        };
    }

    handleItemClick = (parentId,currentPage=1) => {
        // Do something with the clicked item ID
        console.log(`Item clicked: ${parentId}`);
        this.setState({ selectedParentId: parentId, feedbackListPage: currentPage });
        // Add your logic here
    };


    handleRefreshFeedbackData = () => {
        this.setState({ refreshFeedbackList: true });
    //     refresh current page


    }

    render() {
        return (
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0 text-dark">Feedback</h1>
                                </div>
                                {/* /.col */}
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                                        <li className="breadcrumb-item active">Feedback</li>
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
                            <div className="row">
                                <section className="col-lg-7 connectedSortable">
                                    {/* TO DO List */}
                                    <FeedbackListCard  onItemClick={this.handleItemClick} />
                                    {/* /.card */}
                                </section>
                                {/* /.Left col */}
                                {/* right col (We are only adding the ID to make the widgets sortable)*/}
                                <section className="col-lg-5 connectedSortable">
                                    {/* solid sales graph */}
                                    <FeedbackChartCard parentId={this.state.selectedParentId}  />
                                    {/* /.card */}
                                </section>
                            </div>
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

export default Feedback;
