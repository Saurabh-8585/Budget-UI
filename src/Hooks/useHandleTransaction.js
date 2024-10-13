import { useEffect, useState } from 'react';

const useHandleTransaction = ({ categories }) => {
    const [selectedOption, setSelectedOption] = useState('All');
    const [activeTab, setActiveTab] = useState('All');
    const [categoryId, setCategoryId] = useState(0);
    const [subCategoryId, setSubCategoryId] = useState(0);
    console.log({ categoryId, subCategoryId })
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setSelectedOption(selectedCategory);
        setActiveTab('All');

        if (selectedCategory === 'All') {
            setCategoryId(0);
        } else {
            const category = categories.find(cat => cat.value === Number(selectedCategory));
            if (category) {
                setCategoryId(category.id);
            }
        }
        setSubCategoryId(0);
    };

    const handleTabClick = (subcategoryValue) => {
        setActiveTab(subcategoryValue);

        if (subcategoryValue === 'All') {
            setSubCategoryId(0);
        } else {
            const selectedCategory = categories.find(category => category.value === Number(selectedOption));
            if (selectedCategory) {
                const subcategoryObj = selectedCategory?.subcategories.find(sub => sub.value === subcategoryValue);
                if (subcategoryObj) {
                    setSubCategoryId(subcategoryObj.id);
                }
            } else if (selectedOption === 'All') {
                const subcategoryObj = categories.flatMap(category => category.subcategories).find(sub => sub.value === subcategoryValue);
                if (subcategoryObj) {
                    setSubCategoryId(subcategoryObj.id);
                }
            }
        }
    };

    const combinedData = categories.flatMap(category =>
        category.subcategories.map(subcategory => ({
            category: category.value,
            subcategory: subcategory.value
        }))
    );

    const filteredData = selectedOption === 'All'
        ? combinedData
        : combinedData.filter(item => item.category === Number(selectedOption));

    const subcategories = [{ subcategory: "All", value: "All" }, ...filteredData.map(item => ({
        subcategory: item.subcategory,
        value: item.subcategory
    }))];

    useEffect(() => {
        if (subcategories.length > 0) {
            setActiveTab(subcategories[0].value);
        }
    }, [selectedOption]);

    const categoryOptions = [
        { label: "All", value: "All" },
        ...categories.map(category => ({
            label: category.label,
            value: category.value
        }))
    ];
    const getExpensesByCategoryAndSubCategory = async () => {
        try {
            const res = await fetch()
        } catch (error) {

        }
    }
    return {
        categoryOptions,
        selectedOption,
        handleCategoryChange,
        subcategories,
        activeTab,
        handleTabClick,
        filteredData
    }
}

export default useHandleTransaction