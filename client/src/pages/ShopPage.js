import React from 'react';
import {Outlet} from "react-router-dom";

const ShopPage = () => {
    return (
        <div>
            <h1>SHOP PAGE</h1>
            <Outlet/> {}
        </div>
    );
};

export default ShopPage;