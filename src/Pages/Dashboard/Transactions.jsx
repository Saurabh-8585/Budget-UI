import React from 'react';
import { CardWrapper, Select, Title } from '../../Components';
import { useCategoryContext } from '../../Context/CategoryContext';
import { useHandleTransaction } from '../../Hooks';
import { format, parseISO, isToday, isYesterday } from 'date-fns';
import { AppImages } from '../../Assets';



const Transactions = ({ userId }) => {
    const { categories, loading } = useCategoryContext();
    const {
        categoryOptions,
        selectedOption,
        handleCategoryChange,
        subcategories,
        activeTab,
        handleTabClick,
        transactions
    } = useHandleTransaction({ categories, userId });

    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        if (isToday(date)) return 'Today';
        if (isYesterday(date)) return 'Yesterday';
        return format(date, 'do MMM');
    };

    return (
        <CardWrapper className="h-full p-3">
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

            <div className="mt-6 h-4/5 overflow-y-scroll">
                {Object.keys(transactions).sort((a, b) => new Date(b) - new Date(a)).map((dateKey, index) => (
                    <div key={index}>
                        <div className="text-gray-500 font-medium mb-3">
                            {formatDate(dateKey)}
                        </div>
                        {transactions[dateKey].map((transaction) => {
                            const subcategory = transaction.categoryId.subcategories.find(sub => sub._id === transaction.subCategoryId)?.name || 'Subcategory';
                            const icon = AppImages.subcategoryIcons[subcategory] || '🛠️';

                            return (
                                <div
                                    key={transaction._id}
                                    className="flex justify-between items-center mb-4"
                                >
                                    <div className="flex items-center">
                                        <div className="mr-3 text-2xl">
                                            {icon}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-lg">{transaction.expenseName}</div>
                                            <div className="text-sm text-gray-500">
                                                {transaction.categoryId.category}
                                                {" - "}
                                                {subcategory}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-gray-500 font-semibold text-lg">
                                        - ₹{transaction.amount.toLocaleString()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </CardWrapper>
    );
};

export default Transactions;
