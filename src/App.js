import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import StockForm from "./components/StockForm";
import StockList from "./components/StockList";

const App = () => {
    const [refresh, setRefresh] = useState(false);
    const [editingStock, setEditingStock] = useState(null);

    const refreshData = () => {
        setRefresh(!refresh); // Trigger re-render
    };

    const handleEdit = (stock) => {
        setEditingStock(stock);
    };

    return (
        <div className="App">
            <Dashboard />
            <StockForm
                onStockAdded={refreshData}
                editingStock={editingStock}
            />
            <StockList
                onStockDeleted={refreshData}
                onStockEdit={handleEdit}
            />
        </div>
    );
};

export default App;
