import React, {HTMLAttributes} from 'react';
import classes from "./Loader.module.css";

interface Loader extends HTMLAttributes<HTMLDivElement> {

}

const Loader = () => {
    return (
        <div className={classes.loader}>
            <div className={classes.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            Loading...
        </div>

    );
};

export default Loader;
