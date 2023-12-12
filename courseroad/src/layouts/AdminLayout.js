import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/AdminLayout.css';
const AdminLayout = () => {
    return(
        <section className='admin-nav'>
            <nav className='admin-nav__panel'>
                <h1>This the adminLayout's navbar</h1>
                {/* Insert Admin Navigation Panel here */}
            </nav>
            <section className='admin-nav__outlet'>
                <Outlet />
            </section>
        </section>
    );
};

export default AdminLayout;