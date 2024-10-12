import React, { useState, useEffect } from 'react';
import { CardWrapper, Title, Select } from '../../Components';

const data = [
    {
        "category": "Essential Expenses",
        "subcategories": [
            { "name": "Housing" },
            { "name": "Transportation" },
            { "name": "Food" },
            { "name": "Utilities and Services" },
            { "name": "Healthcare" },
            { "name": "Insurance" },
            { "name": "Debt Repayments" }
        ]
    },
    {
        "category": "Non-Essential Expenses",
        "subcategories": [
            { "name": "Entertainment and Leisure" },
            { "name": "Personal Care" },
            { "name": "Clothing and Accessories" }
        ]
    },
    {
        "category": "Savings and Investments",
        "subcategories": [
            { "name": "Savings" },
            { "name": "Investments" }
        ]
    },
    {
        "category": "Miscellaneous",
        "subcategories": [
            { "name": "Education and Self-Improvement" },
            { "name": "Gifts and Donations" },
            { "name": "Miscellaneous" }
        ]
    }
];

// Create a single array of JSON objects
const combinedData = data.flatMap(category =>
    category.subcategories.map(subcategory => ({
        category: category.category,
        subcategory: subcategory.name
    }))
);

const categories = [
    { label: "All", value: "All" },
    { label: "Essential Expenses", value: "Essential Expenses" },
    { label: "Non-Essential Expenses", value: "Non-Essential Expenses" },
    { label: "Savings and Investments", value: "Savings and Investments" },
    { label: "Miscellaneous", value: "Miscellaneous" }
];

const Transactions = () => {
    const [selectedOption, setSelectedOption] = useState('All');
    const [activeTab, setActiveTab] = useState('All'); // "All" is the default active tab

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        setActiveTab('All'); // Reset active tab to "All" when changing category
    };

    // Filter the combined data based on the selected category
    const filteredData = selectedOption === 'All'
        ? combinedData
        : combinedData.filter(item => item.category === selectedOption);

    // Add "All" to subcategory tabs
    const subcategories = [{ subcategory: "All" }, ...filteredData];

    const handleTabClick = (subcategory) => {
        setActiveTab(subcategory);
    };

    // Set the first tab as selected on component mount
    useEffect(() => {
        if (subcategories.length > 0) {
            setActiveTab(subcategories[0].subcategory);
        }
    }, [selectedOption]); // This effect runs whenever the selected category changes

    return (
        <CardWrapper>
            <div className='flex justify-between items-center bg-red-300'>
                <div>
                    <Title title="Transactions" />
                </div>
                <div>
                    <Select
                        options={categories}
                        id="select-option"
                        selectedValue={selectedOption}
                        onChange={handleSelectChange}
                    />
                </div>
            </div>

            <div className="mt-4">
                {/* Render tabs for subcategories with horizontal scroll */}
                <div className="flex space-x-4 overflow-x-auto">
                    {subcategories.map((item, index) => (
                        <button
                            key={index}
                            className={`whitespace-nowrap rounded ${activeTab === item.subcategory ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors duration-300 inline-block p-3 rounded-lg`}
                            onClick={() => handleTabClick(item.subcategory)}
                        >
                            {item.subcategory}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                {/* Show active tab content */}
                {activeTab === 'All' ? (
                    <div className="p-4 bg-gray-100 rounded shadow">
                        <h3 className="text-lg font-semibold">All Subcategories</h3>
                        <ul>
                            {filteredData.map((item, index) => (
                                <li key={index}>{item.subcategory}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="p-4 bg-gray-100 rounded shadow">
                        <h3 className="text-lg font-semibold">Active Subcategory: {activeTab}</h3>
                        <p>Showing details for {activeTab}.</p>
                    </div>
                )}
            </div>
        </CardWrapper>
    );
}

export default Transactions;
