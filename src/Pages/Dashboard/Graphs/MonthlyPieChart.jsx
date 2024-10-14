import React from 'react';
import { CardWrapper, Title } from '../../../Components';
import { ApiUrls } from '../../../Constants/ApiUrl';
import { useFetchData } from '../../../Hooks';
import { Pie } from '@ant-design/plots';

const MonthlyPieChart = ({ userId, refresh }) => {
    const options = {
        headers: {
            Authorization: userId
        }
    }
    const { data, loading } = useFetchData(ApiUrls.GET_CURRENT_MONTH_EXPENSE, options, refresh);
    const config = {
        data: data || [],
        angleField: 'totalAmount',
        colorField: 'category',
        paddingRight: 80,
        innerRadius: 0.6,
        label: {
            text: 'totalAmount',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
            },
        },
    };
    const COLORS = {
        "Essentials": "#27AE60",
        "Non-Essentials": "#F2C94C",
        "Miscellaneous": "#BFC5D4",
    };


    return (
        <CardWrapper className="flex justify-between h-full">
            <Title title="This Month" />
            <Pie {...config} />
        </CardWrapper>
    );
};

export default MonthlyPieChart;
