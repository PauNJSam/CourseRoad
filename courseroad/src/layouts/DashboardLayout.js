import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return(
        <React.Fragment>
            <p>This is the Dashboard Layout</p>
            <article>
                <Outlet />
            </article>
        </React.Fragment>
    );
};
export default DashboardLayout;