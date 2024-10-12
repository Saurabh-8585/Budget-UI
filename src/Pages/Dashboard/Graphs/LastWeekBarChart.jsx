import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer } from 'recharts';
import { CardWrapper, Title } from '../../../Components';

const DemoColumn = () => {
    const [data, setData] = useState([]);

    const GraphThemeColors = {
        "Essential": "#27AE60",
        "Non-Essential": "#F2C94C"
    };

    useEffect(() => {
        // Dummy data for last week's expenses
        const dummyData = [
            { day: 'Mon', Essential: 120, NonEssential: 80 },
            { day: 'Tue', Essential: 150, NonEssential: 50 },
            { day: 'Wed', Essential: 90, NonEssential: 60 },
            { day: 'Thu', Essential: 110, NonEssential: 70 },
            { day: 'Fri', Essential: 130, NonEssential: 90 },
            { day: 'Sat', Essential: 140, NonEssential: 60 },
            { day: 'Sun', Essential: 160, NonEssential: 100 },
        ];
        setData(dummyData);
    }, []);

    // Function to add up 'Essential' and 'Non-Essential' for each day
    const dataWithTotal = data.map(item => ({
        ...item,
        total: item.Essential + item.NonEssential,
    }));

    return (
        <CardWrapper>
            <Title title="Last Week" />
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={dataWithTotal}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Legend />
                    <Bar
                        dataKey="Essential"
                        stackId="a"
                        fill={GraphThemeColors["Essential"]}
                    >
                        <LabelList
                            dataKey="Essential"
                            position="insideTop"
                            fontWeight={400}
                            fill='black'
                            fontSize={12}
                        />
                    </Bar>
                    <Bar
                        dataKey="NonEssential"
                        stackId="a"
                        fill={GraphThemeColors["Non-Essential"]}
                        radius={[10, 10, 0, 0]}
                    >
                        <LabelList
                            dataKey="NonEssential"
                            position="insideTop"
                            fontWeight={400}
                            fill='black'
                            fontSize={12}

                        />
                        {/* Display total on top of the bar */}
                        <LabelList
                            dataKey="total"
                            position="top"
                            content={({ x, y, value }) => (
                                <text
                                    x={x + 30}
                                    y={y - 10}
                                    fill="black"
                                    textAnchor="middle"
                                    fontWeight="bold"
                                    fontSize={12}
                                >
                                    {value}
                                </text>
                            )}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </CardWrapper>
    );
};

export default DemoColumn;
