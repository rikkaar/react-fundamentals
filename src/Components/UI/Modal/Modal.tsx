import React, {HTMLAttributes} from 'react';
import classes from "./modal.module.css";

interface Modal extends HTMLAttributes<HTMLDivElement>{
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({children, visible, setVisible} : Modal) => {

    const rootClasses = [classes.modal]

    if (visible) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.modalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
