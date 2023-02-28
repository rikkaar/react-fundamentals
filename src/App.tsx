import React, {useEffect, useMemo, useState, useTransition} from 'react';
import './styles/App.css';
import route, {Routes, Route, useNavigate, BrowserRouter} from 'react-router-dom'
import Posts from "./Components/pages/Posts";
import NavBar from "./Components/UI/NavBar";
import NotFound from "./Components/UI/NotFound/NotFound";
import AppRouting from "./Components/AppRouting";
import {AuthContext} from "./context/context";

function App() {
    const [isAuth, setIsAuth] = useState<"unauthorized" | "authorized">("authorized");
    return (
        <AuthContext.Provider value={isAuth}>
            <BrowserRouter>
                <div className="app">
                    <NavBar/>
                    <AppRouting/>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );

}

export default App;
