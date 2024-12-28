import { useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { io } from 'socket.io-client';
import { ChartContext } from '../context/ChartContext';
ChartJS.register(...registerables); // Register all default modules including the category scale

const CPUChart = () => {
    const { cpuUsageData, setCpuUsageData, setVulenerable, vulnerable } = useContext(ChartContext);
    //append the vulnerable log in a ts file
    useEffect(() => {
        const socket = io('http://localhost:3000'); // Replace with your server URL

        socket.on('cpu-usage', (usage: number) => {
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
        socket.on('cpu-usage-alert', (vulnerable: boolean) => {
            setVulenerable?.(vulnerable);
        })
        return () => {
            socket.disconnect();
        };
    }, [setCpuUsageData]);

    return (
        <div>
            <h1>CPU Usage Monitor</h1>
            <h2>{vulnerable}</h2>
            <Line data={cpuUsageData} options={{}} />
        </div>
    );
};

export default CPUChart;