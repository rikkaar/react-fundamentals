import React, {ButtonHTMLAttributes, FC, RefObject,} from 'react';
import classes from './MyButton.module.css';

interface Button extends ButtonHTMLAttributes<HTMLButtonElement>{
    ref?: RefObject<HTMLButtonElement>
    add?: boolean;
    del?: boolean;
}


const MyButton: FC<Button> = ({add, del,...props}) => {
    if (add) return (
        <button {...props} className={classes.addBtn}>
        </button>
    );
    else if (del) return (
        <button {...props} className={classes.deleteBtn }>
        </button>
    );
    else return (
            <button {...props}>
            </button>
        );



};


export default MyButton;



// import React, {CSSProperties, HTMLProps,} from 'react';
// import classes from './MyButton.module.css';
//
// interface Button extends HTMLProps<HTMLButtonElement>{
//     add?: boolean
//     del?: boolean
// }
//
//
// const MyButton = ({children, add, del, style, disabled}: Button) => {
//     if (add) return (
//         <button disabled={disabled} style={style} className={classes.addBtn}>
//             {children}
//         </button>
//     );
//     else if (del) return (
//         <button disabled={disabled} style={style} className={classes.deleteBtn }>
//             {children}
//         </button>
//     );
//     else return (
//             <button disabled={disabled} style={style}>
//                 {children}
//             </button>
//         );
//
//
// };
//
//
// export default MyButton;
