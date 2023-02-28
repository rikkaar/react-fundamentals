import React, {useContext} from 'react';
import {Route, Routes, useSearchParams} from "react-router-dom";
import Posts from "./pages/Posts";
import NotFound from "./UI/NotFound/NotFound";
import PostFull from "./PostFull";
import {routes} from "../router";
import {AuthContext} from "../context/context";


const UnAuthRedirection = () => {
    return (
        <div>
            YOU WERE REDIRECTED! hahah
        </div>
    )
}

const AppRouting = () => {
    const isAuth = useContext(AuthContext)

    return (
        <Routes>
            {routes.map(route => {
                if (route.private && (isAuth == "unauthorized")) {
                    return (<Route path={route.path} element={UnAuthRedirection()}/>)
                }
                else return (<Route path={route.path} element={route.element()}/>)
            })}
        </Routes>
    );
};

export default AppRouting;
