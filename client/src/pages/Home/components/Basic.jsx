import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useLocation } from 'react-router-dom';
import { useGetConsumerDashboardQuery } from '../../../queries/Consumer.query';

export default function BasicChart() {
    const { data, isError, isLoading } = useGetConsumerDashboardQuery({});
    const location = useLocation();

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        if (!data) {
            return;
        }

        const chartData = {
            labels: ['Users', 'Orders', 'Sell'],
            datasets: [
                {
                    label: 'Total',
                    data: [data.consumers, data.orders, data.sell],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };

        setChartData(chartData);
        setChartOptions(options);
    }, [data, location]);

    if (isError) {
        return <div>Something went wrong</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full lg:w-1/2">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
}
