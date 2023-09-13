import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
const AdminLayout = () => {
    return(
        <React.Fragment>
            <nav>
                <h1>This the adminLayout's navbar</h1>
            </nav>
            <section>
                <Outlet />
            </section>
        </React.Fragment>
    );
};

export default AdminLayout;