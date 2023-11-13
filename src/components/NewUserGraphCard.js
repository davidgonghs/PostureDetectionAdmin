import React, { Component } from 'react';
import Chart from 'chart.js';

class NewUserGraphCard extends Component {
    constructor(props) {
        super(props);
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.fetchNewUserData();
    }

    fetchNewUserData() {
        // Make a request to your API
        fetch(`${this.apiUrl}/user/count/new-user/lastweek`)
            .then((response) => response.json())
            .then((data) => {
                this.updateChart(data.data);
            })
            .catch((error) => {
                console.error('Error fetching new user data:', error);
            });
    }

    updateChart(data) {
        const dates = data.map((entry) => entry.date);
        const newUserCounts = data.map((entry) => entry.newUser);

        const chartData = {
            labels: dates,
            datasets: [
                {
                    label: 'New Users',
                    fill: false,
                    borderWidth: 2,
                    lineTension: 0,
                    spanGaps: true,
                    borderColor: '#efefef',
                    pointRadius: 3,
                    pointHoverRadius: 7,
                    pointColor: '#efefef',
                    pointBackgroundColor: '#efefef',
                    data: newUserCounts,
                },
            ],
        };

        const chartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: '#efefef'
                    },
                    gridLines: {
                        display: true,
                        color: '#efefef',
                        drawBorder: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        stepSize: 1,
                        fontColor: '#efefef',
                        max:10

                    },
                    gridLines: {
                        display: true,
                        color: '#efefef',
                        drawBorder: false
                    }
                }]
            }
        };

        new Chart(this.chartRef.current, {
            type: 'line',
            data: chartData,
            options: chartOptions,
        });
    }

    render() {
        return (
            <div className="card bg-gradient-info">
                <div className="card-header border-0">
                    <h3 className="card-title">
                        <i className="fas fa-th mr-1" />
                        New User Graph
                    </h3>
                    <div className="card-tools">
                        <button
                            type="button"
                            className="btn bg-info btn-sm"
                            data-card-widget="collapse"
                        >
                            <i className="fas fa-minus" />
                        </button>
                        <button
                            type="button"
                            className="btn bg-info btn-sm"
                            data-card-widget="remove"
                        >
                            <i className="fas fa-times" />
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <canvas
                        className="chart"
                        ref={this.chartRef}
                        style={{
                            minHeight: 250,
                            height: 250,
                            maxHeight: 250,
                            maxWidth: '100%',
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default NewUserGraphCard;
