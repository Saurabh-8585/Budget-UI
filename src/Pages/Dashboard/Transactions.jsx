import React from 'react';
import { CardWrapper, Select, Title } from '../../Components';
import { useCategoryContext } from '../../Context/CategoryContext';
import { useHandleTransaction } from '../../Hooks';

const Transactions = () => {
    const { categories, loading } = useCategoryContext();
    const {
        categoryOptions,
        selectedOption,
        handleCategoryChange,
        subcategories,
        activeTab,
        handleTabClick,
        filteredData
    } = useHandleTransaction({ categories })
    return (
        <CardWrapper>
            {/* Header Section */}
            <div className='flex justify-between items-center'>
                <Title title="Transactions" />
                <div>
                    <Select
                        options={categoryOptions}
                        id="select-option"
                        selectedValue={selectedOption}
                        onChange={handleCategoryChange}
                        disabled={loading}
                    />
                </div>
            </div>

            {/* Tabs for Subcategories */}
            <div className="mt-4">
                <div className="flex gap-3 overflow-x-auto snap-mandatory snap-x">
                    {subcategories.map((item, index) => (
                        <button
                            key={index}
                            className={`snap-center whitespace-nowrap rounded ${activeTab === item.value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors duration-300 inline-block p-2 rounded-lg text-sm`}
                            onClick={() => handleTabClick(item.value)}
                        >
                            {categories.flatMap(cat => cat.subcategories).find(sub => sub.value === item.value)?.label || item.subcategory}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'All' ? (
                    <div className="p-4 bg-gray-100 rounded shadow">
                        <h3 className="text-lg font-semibold">All Subcategories</h3>
                        <ul>
                            {filteredData.map((item, index) => (
                                <li key={index}>
                                    {categories.flatMap(cat => cat.subcategories).find(sub => sub.value === item.subcategory)?.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="p-4 bg-gray-100 rounded shadow">
                        <h3 className="text-lg font-semibold">Active Subcategory: {categories.flatMap(cat => cat.subcategories).find(sub => sub.value === activeTab)?.label}</h3>
                        <p>Showing details for {categories.flatMap(cat => cat.subcategories).find(sub => sub.value === activeTab)?.label}.</p>
                    </div>
                )}
            </div>
        </CardWrapper>
    );
};

export default Transactions;
