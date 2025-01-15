import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ refresh }) => {
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [topStock, setTopStock] = useState(null);
    const [distribution, setDistribution] = useState({});
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null);

    // Fetch portfolio value
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/stocks/portfolio-value`)
            .then((response) => {
                setPortfolioValue(response.data);
            })
            .catch((error) => {
                console.error("Error fetching portfolio value:", error);
            });
    }, [refresh]);

    // Fetch top-performing stock
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/stocks/top-performing-stock`)
            .then((response) => {
                setTopStock(response.data);
            })
            .catch((error) => {
                console.error("Error fetching top-performing stock:", error);
            });
    }, []);

    // Fetch portfolio distribution
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/stocks/portfolio-distribution`)
            .then((response) => {
                setDistribution(response.data);
                console.log("Portfolio Distribution Response:", response.data);
                setChartData({
                    labels: Object.keys(response.data),
                    datasets: [
                        {
                            label: "Portfolio Distribution (%)",
                            data: Object.values(response.data),
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#4BC0C0",
                                "#9966FF",
                                "#FF9F40",
                            ],
                            hoverBackgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#4BC0C0",
                                "#9966FF",
                                "#FF9F40",
                            ],
                        },
                    ],
                });
            })
            .catch((error) => {
                console.error("Error fetching portfolio distribution:", error);
            });
    }, []);

    // Cleanup function to destroy chart instances
    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center">Portfolio Tracker</h1>
            <h2 className="text-center text-success">
                Total Portfolio Value: ${portfolioValue.toFixed(2)}
            </h2>

            <div className="mt-5">
                <h3 className="text-center">Top Performing Stock</h3>
                {topStock ? (
                    <div className="text-center mt-3">
                        <p>
                            <strong>Name:</strong> {topStock.name}
                        </p>
                        <p>
                            <strong>Ticker:</strong> {topStock.ticker}
                        </p>
                        <p>
                            <strong>Quantity:</strong> {topStock.quantity}
                        </p>
                        <p>
                            <strong>Buy Price:</strong> ${topStock.buyPrice.toFixed(2)}
                        </p>
                    </div>
                ) : (
                    <p className="text-center">Loading...</p>
                )}
            </div>

            <div className="mt-5">
                <h3 className="text-center">Portfolio Distribution</h3>
                {chartData ? (
                    <div className="d-flex justify-content-center">
                        <div style={{ width: "50%", maxWidth: "400px" }}>
                            <Pie 
                                data={chartData} 
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    plugins: {
                                        legend: {
                                            position: "bottom",
                                            labels: {
                                                boxWidth: 15,
                                                font: {
                                                    size: 12,
                                                },
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <p className="text-center">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
