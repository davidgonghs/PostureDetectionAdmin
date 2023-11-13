import React, {Component} from 'react'
import FeedbackListCard from "./FeedbackListCard";
import ActivityUserGraphCard from "./ActivityUserGraphCard";
import NewUserGraphCard from "./NewUserGraphCard";
import SmallBoxesContent from "./SmallBoxesContent";
class Dashboard extends Component {




    render() {
        return (
            <div>
                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Dashboard</h1>
                                </div>
                                {/* /.col */}
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active">Dashboard</li>
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
                            {/* Small boxes (Stat box) */}
                            <SmallBoxesContent/>
                            {/* /.row */}
                            {/* Main row */}
                            <div className="row">
                                {/* Left col */}
                                <section className="col-lg-7 connectedSortable">
                                    {/* Custom tabs (Charts with tabs)*/}
                                    <ActivityUserGraphCard/>
                                    {/* /.card */}

                                    {/* TO DO List */}
                                    <FeedbackListCard/>
                                    {/* /.card */}
                                </section>
                                {/* /.Left col */}
                                {/* right col (We are only adding the ID to make the widgets sortable)*/}
                                <section className="col-lg-5 connectedSortable">

                                    {/* solid sales graph */}
                                    <NewUserGraphCard/>
                                    {/* /.card */}


                                </section>
                                {/* right col */}
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

export default Dashboard;