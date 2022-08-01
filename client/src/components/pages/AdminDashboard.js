import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export const AdminDashboard = () => {

    const login = useSelector(state => console.log({ login: state }));

    return (
        <div style={{ width: "76%", margin: "80px auto" }}>
            Admin Dashboard
        </div>
    );
};


