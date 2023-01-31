import React, {FC, SelectHTMLAttributes} from 'react';

interface SelectInterface extends SelectHTMLAttributes<HTMLSelectElement> {
    options: {
        value: string,
        name: string,
    }[]
}

const Select: FC<SelectInterface> = ({value, onChange, options, ...props}) => {
    return (
        <select className="sort-field"
                value={value}
                onChange={onChange}
        >

            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default Select;
