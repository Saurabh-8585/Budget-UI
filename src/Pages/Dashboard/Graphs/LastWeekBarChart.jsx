import { Column } from '@ant-design/plots';
import React from 'react';
import { CardWrapper, Title } from '../../../Components';
import { ApiUrls } from '../../../Constants/ApiUrl';
import { useFetchData } from '../../../Hooks';

const LastWeekBarChart = ({ userId, refresh }) => {
    const options = {
        headers: {
            Authorization: userId
        }
    }
    const { data, loading } = useFetchData(ApiUrls.GET_LAST_WEEk_EXPENSE, options, refresh);
    const GraphThemeColors = {
        "Essential Expenses": "#27AE60",
        "Non-Essential Expenses": "#F2C94C",
        "Miscellaneous": "#0088FE",
        "Savings and Investments": "#FF8042"
    };


    const config = {
        data: data || [],
        xField: 'date',
        yField: 'amount',
        colorField: 'category',
        percent: false,
        stack: true,
        color: ({ category }) => GraphThemeColors[category],
        interaction: {
            tooltip: {
                shared: true,
            },
        },

    };

    return (
        <CardWrapper>
            <Title title="Last Week Expenses" />
            <Column {...config} loading={loading} />
        </CardWrapper>
    );
};

export default LastWeekBarChart;
