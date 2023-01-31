import React, {ButtonHTMLAttributes, FC, RefObject,} from 'react';
import classes from './MyButton.module.css';

interface Button extends ButtonHTMLAttributes<HTMLButtonElement>{
    ref?: RefObject<HTMLButtonElement>
    add?: boolean;
    del?: boolean;
    round?: boolean;
}


const MyButton: FC<Button> = ({round, add, del, children,...props}) => {
    if (add) return (
        <button {...props} className={classes.addBtn}>{children}
        </button>
    );
    else if (del) return (
        <button {...props} className={classes.deleteBtn}>{children}
        </button>
    );
    else if (round) return (
        <button {...props} className={classes.roundButton}>{children}
        </button>
    );
    else return (
            <button {...props} className={classes.generalBtn}>{children}
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
