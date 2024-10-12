import { Column } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';
import { CardWrapper, Title } from '../../../Components';

const DemoColumn = () => {
    const [data, setData] = useState([]);
    const GraphThemeColors = ["#27AE60", "#F2C94C", "#BFC5D4"]
    useEffect(() => {
        // Dummy data for last week's expenses
        const dummyData = [
            { day: 'Mon', value: 120, type: 'Essential' },
            { day: 'Mon', value: 80, type: 'Non-Essential' },
            { day: 'Tue', value: 150, type: 'Essential' },
            { day: 'Tue', value: 50, type: 'Non-Essential' },
            { day: 'Wed', value: 90, type: 'Essential' },
            { day: 'Wed', value: 60, type: 'Non-Essential' },
            { day: 'Thu', value: 110, type: 'Essential' },
            { day: 'Thu', value: 70, type: 'Non-Essential' },
            { day: 'Fri', value: 130, type: 'Essential' },
            { day: 'Fri', value: 90, type: 'Non-Essential' },
            { day: 'Sat', value: 140, type: 'Essential' },
            { day: 'Sat', value: 60, type: 'Non-Essential' },
            { day: 'Sun', value: 160, type: 'Essential' },
            { day: 'Sun', value: 100, type: 'Non-Essential' },
        ];
        setData(dummyData);
    }, []);

    // Function to create annotations for the chart
    const createAnnotations = (data) => {
        const groupedData = {};
        data.forEach(item => {
            if (!groupedData[item.day]) {
                groupedData[item.day] = 0;
            }
            groupedData[item.day] += item.value;
        });

        return Object.entries(groupedData).map(([day, totalValue]) => ({
            type: 'text',
            data: [day, totalValue],
            style: {
                textAlign: 'center',
                fontSize: 14,
                fill: 'rgba(0,0,0,0.85)',
            },
            xField: 'day',
            yField: 'value',
            style: {
                text: `${totalValue}`,
                textBaseline: 'bottom',
                position: 'top',
                textAlign: 'center',
            },
            tooltip: false,
        }));
    };

    const annotations = createAnnotations(data);

    const config = {
        data,
        xField: 'day',
        yField: 'value',
        stack: true,
        colorField: 'type', // Use 'type' to differentiate colors
        color: GraphThemeColors, // Apply the color array from your theme
        label: {
            text: 'value',
            textBaseline: 'bottom',
            position: 'inside',
        },
        annotations,
    };

    return (
        <CardWrapper>
            <Title title="Last Week" />
            <Column {...config} />
        </CardWrapper>
    );
};

export default DemoColumn;
