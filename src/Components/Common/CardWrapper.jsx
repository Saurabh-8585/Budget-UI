import React from 'react'

const CardWrapper = ({ className, children }) => {
    return (
        <div className={`w-full h-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${className}`}>
            {children}
        </div>
    )
}

export default CardWrapper