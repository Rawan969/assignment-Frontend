import React, { useEffect, useState } from "react";
import axios from "axios";

const StockList = ({ onStockDeleted, onStockEdit }) => {
    const [stocks, setStocks] = useState([]);

    const fetchStocks = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/stocks`)
            .then((response) => {
                setStocks(response.data);
            })
            .catch((error) => {
                console.error("Error fetching stocks:", error);
            });
    };

    useEffect(() => {
        fetchStocks();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/stocks/${id}`)
            .then(() => {
                alert("Stock deleted successfully!");
                onStockDeleted();
            })
            .catch((error) => {
                console.error("Error deleting stock:", error);
                alert("Failed to delete stock.");
            });
    };

    return (
        <div className="card p-3">
            <h3 className="mb-3">Stock List</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Ticker</th>
                        <th>Quantity</th>
                        <th>Buy Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock) => (
                        <tr key={stock.id}>
                            <td>{stock.name}</td>
                            <td>{stock.ticker}</td>
                            <td>{stock.quantity}</td>
                            <td>${stock.buyPrice.toFixed(2)}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => onStockEdit(stock)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(stock.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockList;
