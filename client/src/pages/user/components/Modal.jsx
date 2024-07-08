import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { zodVerification } from "../../../utils/zodVerfication";
import { useRegisterConsumerMutation } from "../../../queries/Consumer.query";

export default function Modal({ visible, setVisible }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        dob: null,
        mobile:""
    });
    const [errors, setErrors] = useState({});

    const [registerConsumer,setRegisterConsumer]=useRegisterConsumerMutation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDateChange = (e) => {
        setFormData({
            ...formData,
            dob: e.value
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            zodVerification(formData);
            const res=await registerConsumer(formData);
            console.log(res.data);
            setErrors({}); 
        } catch (error) {
            if (error.errors) {
                const errorMessages = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                setErrors(errorMessages);
            }
        }
    };

    return (
        <div className="card flex justify-content-center">
            <Dialog draggable={false} header="Add User" position="top" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full border outline-none"
                            placeholder="Enter the user name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <span className="text-red-500">{errors.name}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border outline-none"
                            placeholder="Enter the user email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <span className="text-red-500">{errors.email}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name">Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            className="w-full border outline-none"
                            placeholder="Enter the user name"
                            value={formData.mobile}
                            onChange={handleInputChange}
                        />
                        {errors.mobile && <span className="text-red-500">{errors.mobile}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            className="w-full border outline-none"
                            placeholder="Enter the user address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                        {errors.address && <span className="text-red-500">{errors.address}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dob">Date of Birth</label><br />
                        <Calendar
                            value={formData.dob}
                            onChange={handleDateChange}
                            showIcon
                        />
                        {errors.dob && <span className="text-red-500">{errors.dob}</span>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
                </form>
            </Dialog>
        </div>
    );
}
