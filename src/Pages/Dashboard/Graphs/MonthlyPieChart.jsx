import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, Label } from 'recharts';
import { CardWrapper, Title } from '../../../Components';

const MonthlyPieChart = () => {
    const data = [
        {
            name: "Essentials",
            value: 34980,
        },
        {
            name: "Non-Essentials",
            value: 34980,
        },
        {
            name: "Miscellaneous",
            value: 34980,
        },
    ];

    const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);

    const COLORS = {
        "Essentials": "#27AE60",
        "Non-Essentials": "#F2C94C",
        "Miscellaneous": "#BFC5D4",
    };
    const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        return (
            <text
                x={x}
                y={y}
                fill="black"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize={10}
            >
                {`${(percent * 100).toFixed(1)}%`}
            </text>
        );
    };

    return (
        <CardWrapper className="flex justify-between">
            <Title title="This Month" />
            <div className=''>
                <PieChart width={500} height={200}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                        label={renderCustomLabel}
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="right" layout="vertical" align="right" />
                </PieChart>
            </div>
        </CardWrapper>
    );
};

export default MonthlyPieChart;
