import { useEffect, useState } from 'react';
import { useRefreshContext } from '../Context/RefreshContext';
import { ApiUrls } from '../Constants/ApiUrl';

const useHandleTransaction = ({ categories, userId }) => {
    const [selectedOption, setSelectedOption] = useState('All');
    const [activeTab, setActiveTab] = useState('All');
    const { refresh } = useRefreshContext();
    const [categoryId, setCategoryId] = useState(0);
    const [subCategoryId, setSubCategoryId] = useState(0);
    const [transactions, setTransactions] = useState([])

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setSelectedOption(selectedCategory);
        setActiveTab('All');

        if (selectedCategory === 'All') {
            setCategoryId(0);
        } else {
            const category = categories.find(cat => cat.value === selectedCategory);
            if (category) {
                setCategoryId(category.value);
            }
        }
        setSubCategoryId(0);
    };

    const handleTabClick = (subcategoryValue) => {
        setActiveTab(subcategoryValue);

        if (subcategoryValue === 'All') {
            setSubCategoryId(0);
        } else {
            const selectedCategory = categories.find(category => category.value === selectedOption);
            if (selectedCategory) {
                const subcategoryObj = selectedCategory?.subcategories.find(sub => sub.value === subcategoryValue);
                if (subcategoryObj) {
                    setSubCategoryId(subcategoryObj.value);
                }
            } else if (selectedOption === 'All') {
                const subcategoryObj = categories.flatMap(category => category.subcategories).find(sub => sub.value === subcategoryValue);
                if (subcategoryObj) {
                    setSubCategoryId(subcategoryObj.value);
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
        : combinedData.filter(item => item.category === selectedOption);

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
        const params = {
            categoryId,
            subCategoryId
        }
        const queryString = new URLSearchParams(params).toString();
        try {
            const res = await fetch(`${ApiUrls.GET_EXPENSES_BY_CATEGORY_AND_SUBCATEGORY_URL}?${queryString}`, {
                headers: {
                    'Authorization': userId
                },
            })
            const data = await res.json()
            setTransactions(data)
        } catch (error) {
            console.log("Error getting transitions", error)
        }
    }

    useEffect(() => {
        getExpensesByCategoryAndSubCategory()
    }, [categoryId, subCategoryId, refresh])
    return {
        categoryOptions,
        selectedOption,
        handleCategoryChange,
        subcategories,
        activeTab,
        handleTabClick,
        transactions,
    }
}

export default useHandleTransaction