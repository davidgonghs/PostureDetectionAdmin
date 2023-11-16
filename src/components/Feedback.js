import React, { Component, createRef } from 'react';
import FeedbackListCard from "./FeedbackListCard";
import FeedbackChartCard from "./FeedbackChartCard";

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.state = {
            parentId: 1,
            refreshList: 0,
            feedbackListPage: 1,
            status: null,
            queryString: window.location.search
        };
    }

    handleItemClick = () => {
        this.handleChange();
    };

    handleRefresh = () => {
        console.log('feedback 23 handleRefresh')
        this.setState({
            refreshList: 1
        })
    }

    handleOnRefreshComplete = () => {
        console.log('feedback 30 Complete')
        this.setState({
            refreshList: 0
        })
    }


    componentDidMount() {
        this.handleChange();
    }

    componentDidUpdate(prevProps,prevState) {
        if (this.state.queryString !== prevState.queryString) {
            console.log('queryString update',this.state.queryString)
            this.handleChange();
        }
    }



    handleChange() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const itemId = urlParams.get('itemId');
        const currentPage = urlParams.get('currentPage');
        const status = urlParams.get('status');

        this.setState({
            parentId: itemId,
            feedbackListPage: currentPage,
            status: status
        })
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
                                    <FeedbackListCard
                                        onItemClick={this.handleItemClick}
                                        isRefresh={this.state.refreshList}
                                        onRefreshComplete={this.handleOnRefreshComplete}
                                    />
                                    {/* /.card */}
                                </section>
                                {/* /.Left col */}
                                {/* right col (We are only adding the ID to make the widgets sortable)*/}
                                <section className="col-lg-5 connectedSortable">
                                    {/* solid sales graph */}
                                    <FeedbackChartCard
                                        parentId={this.state.parentId}
                                        status={this.state.status}
                                        onRefresh={this.handleRefresh}/>
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
