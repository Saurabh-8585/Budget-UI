import { createContext, useContext, useState, useEffect } from "react";

const TransactionContext = createContext();

export const useTransactionContext = () => useContext(TransactionContext);

const TransactionContextProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTransaction = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
            const response = await fetch("/data.json");
            const data = await response.json();
            if (data?.length > 0) {
                const formattedData = data?.map(options => ({
                    ...options,
                    label: options.category,
                    value: options.id,
                    subcategories: options.subcategories.map(sub => ({
                        ...sub,
                        label: sub.name,
                        value: sub.id,
                    }))
                }))
                console.log({ formattedData })
                setCategories(formattedData)
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTransaction();
    }, []);

    return (
        <TransactionContext.Provider value={{ categories, loading }}>
            {children}
        </TransactionContext.Provider>
    );
};

export default TransactionContextProvider;
