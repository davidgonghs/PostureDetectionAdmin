import React, {Component} from 'react';
import Chart from 'chart.js';

class ActivityUserGraphCard extends Component {
    constructor(props) {
        super(props);
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.revenueChartRef = React.createRef();
        this.barChartRef = React.createRef();
    }


    componentDidMount() {
        this.fetchDataAndRenderCharts();
    }

    fetchDataAndRenderCharts = async () => {
        try {
            const response = await fetch(`${this.apiUrl}/data/revenue/area`);
            const data = await response.json();

            if (response.ok) {
                this.initChart(data.data);
            } else {
                console.error(`Failed to fetch activity data. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching activity data:', error);
        }
    };

    initChart(activityData) {
        const { date, userNumber, activityNumber } = activityData;
        // Revenue chart
        const revenueChartCanvas = this.revenueChartRef.current.getContext('2d');
        const revenueChartData = {
            labels: date,
            datasets: [
                {
                    label: 'User Activity',
                    backgroundColor: 'rgba(210, 214, 222, 1)',
                    borderColor: 'rgba(210, 214, 222, 1)',
                    pointRadius: false,
                    pointColor: 'rgba(210, 214, 222, 1)',
                    pointStrokeColor: '#c1c7d1',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: activityNumber
                },
                {
                    label: 'Total User',
                    backgroundColor: 'rgba(60,141,188,0.9)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    pointRadius: false,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data: userNumber
                }
            ]
        };

        const revenueChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        beginAtZero: true, // Start Y-axis from zero
                        stepSize: 1, // Set the step size to 1 for integer labels,
                        max: 10, // Set the maximum value for the Y-axis
                    },
                }]
            }
        };

        new Chart(revenueChartCanvas, {
            type: 'line',
            data: revenueChartData,
            options: revenueChartOptions
        });


        var barChartCanvas = this.barChartRef.current.getContext('2d');

        var barChartData = Object.assign({}, revenueChartData);
        var temp0 = revenueChartData.datasets[0];
        var temp1 = revenueChartData.datasets[1];
        barChartData.datasets[0] = temp1;
        barChartData.datasets[1] = temp0;

        var barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            datasetFill: false,
        };

        new Chart(barChartCanvas, {
            type: 'bar',
            data: barChartData,
            options: barChartOptions,
        });
    }



    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">
                        <i className="fas fa-chart-pie mr-1"/>
                        Activity User
                    </h3>
                    <div className="card-tools">
                        <ul className="nav nav-pills ml-auto">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    href="#revenue-chart"
                                    data-toggle="tab"
                                >
                                    Area
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#sales-chart"
                                    data-toggle="tab"
                                >
                                    Bar
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card-body">
                    <div className="tab-content p-0">
                        <div
                            className="chart tab-pane active"
                            id="revenue-chart"
                            style={{position: "relative", height: 300}}
                        >
                            <canvas
                                ref={this.revenueChartRef}
                                height={300}
                                style={{height: 300}}
                            />
                        </div>
                        <div
                            className="chart tab-pane"
                            id="sales-chart"
                            style={{position: "relative", height: 300}}
                        >
                            <canvas
                                ref={this.barChartRef}
                                height={300}
                                style={{height: 300}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ActivityUserGraphCard;
