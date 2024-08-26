import React, { forwardRef } from 'react';

const Select = forwardRef(({ options, label, ...props }, ref) => (
    <div>
        <label>{label}</label>
        <select ref={ref} {...props}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
));

export default Select;
