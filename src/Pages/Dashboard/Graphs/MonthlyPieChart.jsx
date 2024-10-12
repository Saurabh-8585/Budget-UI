import React from 'react';
import { Pie } from '@ant-design/plots';
import { CardWrapper, Title } from '../../../Components';


const MonthlyPieChart = () => {
    const data = [
        {
            type: "Essentials",
            value: 34980,
        },
        {
            type: "Non-Essentials",
            value: 34980,
        },
        {
            type: "Miscellaneous", // Ensure consistent naming
            value: 34980,
        },
    ];

    const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);

    const angleField = 'value';
    const colorField = 'type';
    const paddingRight = 80;
    const innerRadius = 0.499;
    const label = {
        text: 'value',
        style: {
            fontWeight: 'bold',
        },
        formatter: (value) => `${((value / totalValue) * 100).toFixed(0)}%`,
    };
    const legend = {
        color: {
            title: true,
            value: true,
            position: 'right',
            formatter: (item) => `${item.type}: ${item.value}`,
            itemSpacing: 5,
        },
    };

    // Color mapping
    const colorMapping = {
        "Essentials": "#D91616",
        "Non-Essentials": "#F2D229",
        "Miscellaneous": "#1C93EA",
    };

    return (
        <CardWrapper>
            <Title title="This Month" />
            <Pie
                data={data}
                angleField={angleField}
                colorField={colorField}
                paddingRight={paddingRight}
                innerRadius={innerRadius}
                label={label}
                legend={legend}
                // Temporarily hardcoding color for testing
                color={() => {
                    console.log("Color function called"); // Check if this logs
                    return "#D91616"; // Hardcoded color for testing
                }}
            />
        </CardWrapper>
    );
}

export default MonthlyPieChart;
