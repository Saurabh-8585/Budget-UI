import React from 'react';
import ReactApexChart from 'react-apexcharts';
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

    const combinedData = (data || []).reduce((acc, item) => {
        const formattedDate = formatDate(item.date);
        const key = `${formattedDate}-${item.category}`;

        if (acc[key]) {
            acc[key].amount += item.amount;
        } else {
            acc[key] = { ...item, date: formattedDate };
        }

        return acc;
    }, {});

    const formattedData = Object.values(combinedData)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const categories = [...new Set(formattedData.map(item => item.date))];
    const essentialExpenses = categories.map(date =>
        formattedData.find(item => item.date === date && item.category === "Essential Expenses")?.amount || 0);
    const nonEssentialExpenses = categories.map(date =>
        formattedData.find(item => item.date === date && item.category === "Non-Essential Expenses")?.amount || 0);
    const savingsInvestments = categories.map(date =>
        formattedData.find(item => item.date === date && item.category === "Savings and Investments")?.amount || 0);

    const series = [
        {
            name: "Essential Expenses",
            data: essentialExpenses
        },
        {
            name: "Non-Essential Expenses",
            data: nonEssentialExpenses
        },
        {
            name: "Savings and Investments",
            data: savingsInvestments
        }
    ];

    const chartOptions = {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: { show: false },
            animations: { enabled: false }
        },
        colors: [GraphThemeColors["Essential Expenses"], GraphThemeColors["Non-Essential Expenses"], GraphThemeColors["Savings and Investments"]],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
            }
        },
        xaxis: {
            categories: categories
        },
        legend: {
            position: 'top'
        },
        fill: {
            opacity: 1
        },
        dataLabels: {
            enabled: true,
        }
    };

    return (
        <CardWrapper className="h-full">
            <Title title="Last Week Expenses" />
            {!loading && (
                <ReactApexChart options={chartOptions} series={series} type="bar" height={350} />
            )}
        </CardWrapper>
    );
};

export default LastWeekBarChart;
