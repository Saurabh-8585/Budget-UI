import { useState, useEffect } from 'react';

const useFetchData = (url, options = {}, refetch) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(url, options);
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                const result = await res.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [refetch]);

    return { data, loading, error };
};

export default useFetchData;
