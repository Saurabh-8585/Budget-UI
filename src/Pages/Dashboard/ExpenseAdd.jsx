import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Input, Modal, Select } from '../../Components';
import { useCategoryContext } from '../../Context/CategoryContext';

const ExpenseAdd = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { categories, loading } = useCategoryContext();
    const [expenseDetails, setExpenseDetails] = useState({
        name: "",
        amount: "",
        categoryId: "",
        subCategoryId: "",
        categoryOptions: [],
        subCategoryOptions: []
    });
    console.log(expenseDetails)
    const setSelected = (key, value) => {
        setExpenseDetails((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    useEffect(() => {
        if (categories.length > 0) {
            const initialCategory = categories[0];
            setExpenseDetails((prev) => ({
                ...prev,
                categoryOptions: categories,
                categoryId: initialCategory.id.toString(),
                subCategoryOptions: initialCategory.subcategories,
                subCategoryId: initialCategory.subcategories.length > 0 ? initialCategory.subcategories[0].id.toString() : ""
            }));
        }
    }, [categories]);

    const handleCategoryChange = (value) => {
        const selectedCategory = categories.find(category => category.id.toString() === value);
        const updatedSubCategoryOptions = selectedCategory ? selectedCategory.subcategories : [];

        setExpenseDetails((prev) => ({
            ...prev,
            categoryId: value,
            subCategoryOptions: updatedSubCategoryOptions,
            subCategoryId: updatedSubCategoryOptions.length > 0 ? updatedSubCategoryOptions[0].id.toString() : ""
        }));
    };

    return (
        <div className='px-5'>
            <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full p-5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                <AiOutlinePlus className="w-4 h-4 font-bold text-xl" />
            </button>

            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                title="New Expense"
                footer={null}
            >
                <form className="">
                    <Input
                        label="What did you spend on?"
                        id="expense-name"
                        value={expenseDetails.name}
                        onChange={(e) => setSelected("name", e.target.value)}
                    />

                    <Input
                        label="Amount"
                        id="expense-amount"
                        type="number"
                        value={expenseDetails.amount}
                        onChange={(e) => setSelected("amount", e.target.value)}
                        placeholder="Enter amount"
                        min={0}
                    />

                    <Select
                        options={expenseDetails.categoryOptions}
                        id="expense-category"
                        selectedValue={expenseDetails.categoryId}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        label="Category"
                        disabled={loading || expenseDetails.categoryOptions.length === 0}

                    />

                    <Select
                        options={expenseDetails.subCategoryOptions}
                        id="expense-subcategory"
                        selectedValue={expenseDetails.subCategoryId}
                        onChange={(e) => setSelected("subCategoryId", e.target.value)}
                        label="Sub-category"
                        disabled={loading || expenseDetails.subCategoryOptions.length === 0}
                    />

                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold"
                    >
                        Add Expense
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default ExpenseAdd;
