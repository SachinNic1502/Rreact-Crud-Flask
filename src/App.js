import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Components/Form';
import Table from './Components/Table';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [tableKey, setTableKey] = useState(0); // Add a state to force table refresh

    const handleEmployeeSelection = (employee) => {
        setSelectedEmployee(employee);
    };

    const refreshTable = () => {
        setTableKey((prevKey) => prevKey + 1); // Update the key to trigger table refresh
    };

    return (
        <div className="h-screen flex flex-col items-center">
            <div className="w-full mb-8">
                <Form employee={selectedEmployee} onFormSubmit={refreshTable} />
            </div>
            <div className="w-full">
                <h2 className="text-2xl">All Data</h2>
                <Table onEmployeeSelect={handleEmployeeSelection} key={tableKey} />
            </div>
        </div>
    );
}

export default App;
