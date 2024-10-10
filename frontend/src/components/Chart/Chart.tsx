import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ChartProps {
    data: {
        month: string;
        total_sales: number
    }[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
    const numbertoMonthConverter = (monthNumber: number) => {
        const date = new Date(0);
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('default', { month: 'long' });
    };

    const chartData: ChartData<'bar'> = {
        labels: data
            .sort((a, b) => parseInt(a.month) - parseInt(b.month))
            .map((item) => numbertoMonthConverter(parseInt(item.month))),
        datasets: [
            {
                label: 'Sales',
                data: data.map((item) => item.total_sales),
                backgroundColor: 'rgba(41, 86, 91, 1)',
                borderColor: 'rgba(41, 86, 91, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales Data',
            },
        },
        scales: {
            y: {
                min: 0,
            },
        },
    };

    return (
        <div className="flex justify-center">
            <div className="w-full p-2 bg-white shadow-md border">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default Chart;
