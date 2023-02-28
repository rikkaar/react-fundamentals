import {Route, Routes} from "react-router-dom";
import Posts from "../Components/pages/Posts";
import NotFound from "../Components/UI/NotFound/NotFound";
import React from "react";

const HomePage = () => {
    return (
        <div><h1>Hello!</h1></div>
    );
}

export const routes = [
    {path: "/posts", element: Posts, private: true},
    {path: "/", element: HomePage},
    {path: "/*", element: NotFound},
]