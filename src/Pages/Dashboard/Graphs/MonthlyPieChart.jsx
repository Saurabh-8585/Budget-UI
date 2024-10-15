import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { CardWrapper, Title } from '../../../Components';
import { ApiUrls } from '../../../Constants/ApiUrl';
import { useFetchData } from '../../../Hooks';

const MonthlyPieChart = ({ userId, refresh }) => {
    const options = {
        headers: {
            Authorization: userId
        }
    };

    const { data } = useFetchData(ApiUrls.GET_CURRENT_MONTH_EXPENSE, options, refresh);

    const categories = data ? data.map(item => item.category) : [];
    const totalAmounts = data ? data.map(item => item.totalAmount) : [];

    const COLORS = {
        "Essentials": "#27AE60",
        "Non-Essentials": "#F2C94C",
        "Miscellaneous": "#BFC5D4",
    };

    const chartOptions = {
        chart: {
            type: 'donut',
            toolbar: { show: false },
        },
        colors: Object.values(COLORS),
        labels: categories,
        plotOptions: {
            pie: {
                expandOnClick: true,
                dataLabels: {
                    offset: 0,
                    minAngleToShowLabel: 15
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(2)}%`,
            style: {
                colors: ['#000'],
                fontSize: '11px',
                fontWeight: '200'
            }
        },
        tooltip: {
            y: {
                formatter: (val) => `${val.toFixed(2)}`
            }
        }
    };

    return (
        <CardWrapper className="flex justify-between h-full">
            <Title title="This Month" />
            <div style={{ width: '100%', height: '100%' }}>
                <ReactApexChart
                    options={chartOptions}
                    series={totalAmounts}
                    type="donut"
                    height={"100%"}
                />
            </div>
        </CardWrapper>
    );
};

export default MonthlyPieChart;
