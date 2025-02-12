import React, {useContext} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {authRoutes, publicRoutes} from '../routes';
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);
    const isAuth = user.IsAuth;
    return (
        <Routes>
            {isAuth === true && authRoutes.map(({path, Component}) => (
                <Route key={path} path={path} element={<Component/>} exact/>
            ))}

            {publicRoutes.map(({path, Component}) => (
                <Route key={path} path={path} element={<Component/>} exact/>
            ))}

            <Route
                path="*"
                element={<Navigate to={SHOP_ROUTE} replace />}
            />
        </Routes>
    );
};

export default AppRouter;
