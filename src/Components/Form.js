import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Form({ employee, onFormSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        salary: ''
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name,
                position: employee.position,
                salary: employee.salary
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (employee) {
                response = await axios.put(`http://127.0.0.1:5000/employees/${employee._id}`, formData);
            } else {
                response = await axios.post('http://127.0.0.1:5000/employees', formData);
            }
            toast.success(response.data.message);
            setFormData({ name: '', position: '', salary: '' });
            // Invoke the callback function to refresh the table data
            if (onFormSubmit) {
                onFormSubmit();
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">{employee ? 'Update Employee' : 'Add Employee'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="border px-4 py-2 w-full rounded-md" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="position" className="block text-gray-700 font-bold mb-2">Position</label>
                    <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} className="border px-4 py-2 w-full rounded-md" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="salary" className="block text-gray-700 font-bold mb-2">Salary</label>
                    <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleChange} className="border px-4 py-2 w-full rounded-md" required />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{employee ? 'Update Employee' : 'Add Employee'}</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Form;
