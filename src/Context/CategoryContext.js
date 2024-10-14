import { createContext, useContext, useState, useEffect } from "react";
import { ApiUrls } from "../Constants/ApiUrl";

const CategoryContext = createContext();

export const useCategoryContext = () => useContext(CategoryContext);

const CategoryContextProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const response = await fetch(ApiUrls.GET_ALL_CATEGORIES_URL);
            const data = await response.json();
            if (data?.length > 0) {
                const formattedData = data?.map(options => ({
                    ...options,
                    label: options.category,
                    value: options._id,
                    subcategories: options.subcategories.map(sub => ({
                        ...sub,
                        label: sub.name,
                        value: sub._id,
                    }))
                }))
                setCategories(formattedData)
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, loading }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryContextProvider;
