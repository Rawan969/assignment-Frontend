import React, { useState, useEffect } from "react";
import axios from "axios";

const StockForm = ({ onStockAdded, editingStock }) => {
    const [name, setName] = useState("");
    const [ticker, setTicker] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [buyPrice, setBuyPrice] = useState(0);

    useEffect(() => {
        if (editingStock) {
            setName(editingStock.name);
            setTicker(editingStock.ticker);
            setQuantity(editingStock.quantity);
            setBuyPrice(editingStock.buyPrice);
        }
    }, [editingStock]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const stock = { name, ticker, quantity, buyPrice };

        const apiCall = editingStock
            ? axios.put(`${process.env.REACT_APP_BACKEND_URL}/stocks/${editingStock.id}`, stock)
            : axios.post(`${process.env.REACT_APP_BACKEND_URL}/stocks`, stock);

        apiCall
            .then(() => {
                alert(editingStock ? "Stock updated successfully!" : "Stock added successfully!");
                onStockAdded(); // Trigger refresh of the dashboard
            })
            .catch((error) => {
                console.error(editingStock ? "Error updating stock:" : "Error adding stock:", error);
                alert(editingStock ? "Failed to update stock." : "Failed to add stock.");
            });

        // Reset form fields
        setName("");
        setTicker("");
        setQuantity(0);
        setBuyPrice(0);
    };

    return (
        <div className="card p-3 mb-4">
            <h3 className="mb-3">{editingStock ? "Edit Stock" : "Add a New Stock"}</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Stock Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Stock Ticker</label>
                    <input
                        type="text"
                        className="form-control"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Buy Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={buyPrice}
                        onChange={(e) => setBuyPrice(Number(e.target.value))}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    {editingStock ? "Update Stock" : "Add Stock"}
                </button>
            </form>
        </div>
    );
};

export default StockForm;
