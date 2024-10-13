import React from 'react';

const Select = ({ options, label, id, selectedValue, onChange, ...props }) => {
    return (
        <div className="mx-auto w-full">
            {label &&
                <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                    {label}
                </label>
            }
            <select
                id={id}
                value={selectedValue}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...props}
            >
                {/* <option value="" disabled>
                    Choose an option
                </option> */}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
