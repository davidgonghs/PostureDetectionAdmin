import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="main-footer">
                    <strong>Copyright © 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>.</strong>
                    <strong> Created By David Gong <a href="http://www.davidgonghongshen.com">www.davidgonghongshen.com</a>.</strong>
                    <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> 1.0
                    </div>
                </footer>
                {/* Control Sidebar */}
                <aside className="control-sidebar control-sidebar-dark">
                    {/* Control sidebar content goes here */}
                </aside>
            </div>

        )
    }
}