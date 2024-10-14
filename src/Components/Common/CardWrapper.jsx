import React from 'react'

const CardWrapper = ({ className, children }) => {
    return (
        <div className={`p-6 bg-white border border-gray-200 rounded-lg shadow ${className}`}>
            {children}
        </div>
    )
}

export default CardWrapper