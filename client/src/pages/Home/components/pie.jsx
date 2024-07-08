import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useLocation } from 'react-router-dom';
import { useGetConsumerDashboardQuery } from '../../../queries/Consumer.query';

export default function PieChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const { data, isError, isLoading } = useGetConsumerDashboardQuery({});
    const location = useLocation();

    useEffect(() => {
        if (!data) {
            return;
        }

        const documentStyle = getComputedStyle(document.documentElement);
        const chartData = {
            labels: ['Users', 'Orders', 'Sell'],
            datasets: [
                {
                    data: [data.consumers, data.orders, data.sell],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400'),
                    ],
                },
            ],
        };

        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                    },
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
            <Chart type="pie" data={chartData} options={chartOptions} />
        </div>
    );
}
