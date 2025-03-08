import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RevenueChart = ({ revenueData }) => {
    const data = {
        labels: revenueData.dates, 
        datasets: [
            {
                label: 'Revenue Over Time',
                data: revenueData.values,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Restaurant Revenue Over Time' },
        },
    };

    return <Line data={data} options={options} />;
};

export default RevenueChart;
