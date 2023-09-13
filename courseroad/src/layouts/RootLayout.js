import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return(
        <React.Fragment>
            <main>
                <Outlet />
            </main>
        </React.Fragment>
    );
};

export default RootLayout;