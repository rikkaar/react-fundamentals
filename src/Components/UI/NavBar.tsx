import React from 'react';
import '../../styles/NavBar.css';
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className={"nav"}>
            <Link className={"nav__item"} to={"/"}>Главная</Link>
            <Link className={"nav__item"} to={"/posts"}>Посты</Link>
        </nav>
    );
};

export default NavBar;
