import React from 'react';

const Input = ({
    label,
    type = 'text',
    id,
    value,
    onChange,
    placeholder = '',
    className = '',
    ...props
}) => {
    return (
        <div className="mb-4">
            {label && (
                <label
                    htmlFor={id}
                    className="block mb-2 text-sm font-medium text-gray-500 "
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none   ${className}`}
                {...props}
            />
        </div>
    );
};

export default Input;
