import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { io } from 'socket.io-client';

ChartJS.register(...registerables); // Register all default modules including the category scale

const CPUChart = () => {
    const [cpuUsageData, setCpuUsageData] = useState<{
        labels: string[];
        datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string; pointRadius: number }[];
    }>({
        labels: [],
        datasets: [
            {
                label: 'CPU Speed (Ghz)',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                pointRadius: 2,
            },
        ],
    });

    useEffect(() => {
        const socket = io('http://localhost:3000'); // Replace with your server URL

        socket.on('cpu-speed-change', (usage: number) => {
            const newTimestamp = new Date().toLocaleTimeString();
            setCpuUsageData((prevData) => ({
                labels: [...prevData.labels.slice(-50), newTimestamp], // Limit data points
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: [...prevData.datasets[0].data.slice(-50), usage],
                    },
                ],
            }));
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>CPU Speed Monitor</h1>
            <Line data={cpuUsageData} options={{}} />
        </div>
    );
};

export default CPUChart;