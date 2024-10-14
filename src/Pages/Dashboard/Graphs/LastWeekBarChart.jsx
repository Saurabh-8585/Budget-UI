import { Column } from '@ant-design/plots';
import React from 'react';
import { CardWrapper, Title } from '../../../Components';
import { ApiUrls } from '../../../Constants/ApiUrl';
import { useFetchData } from '../../../Hooks';
import { format } from 'date-fns';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'd MMMM');
};

const LastWeekBarChart = ({ userId, refresh }) => {
    const options = {
        headers: {
            Authorization: userId
        }
    };
    const { data, loading } = useFetchData(ApiUrls.GET_LAST_WEEk_EXPENSE, options, refresh);

    const GraphThemeColors = {
        "Essential Expenses": "#27AE60",
        "Non-Essential Expenses": "#F2C94C",
        "Miscellaneous": "#0088FE",
        "Savings and Investments": "#FF8042"
    };

    const formattedData = (data || [])
        .map((item) => ({
            ...item,
            date: formatDate(item.date),
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const config = {
        data: formattedData,
        xField: 'date',
        yField: 'amount',
        colorField: 'category',
        stackField: 'category',
        stack: true,
        color: ({ category }) => GraphThemeColors[category],
        label: {
            position: 'top',
            style: {
                fill: '#fff',
                fontSize: 12,
                fontWeight: 'bold'
            },
            content: (item) => `${item.amount.toFixed(2)}`,
        },
        interactions: [{ type: 'element-highlight-by-x' }, { type: 'element-active' }],
    };

    return (
        <CardWrapper className="h-full">
            <Title title="Last Week Expenses" />
            <Column {...config} loading={loading} />
        </CardWrapper>
    );
};

export default LastWeekBarChart;
