import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { io } from 'socket.io-client';
ChartJS.register(...registerables);
const MemoryUsage = () => {
    const [vulnerable, setVulnerable] = useState<boolean>(false);
    //we will be make a state for our labels and the points.
    const [memoryUsage, setMemoryUsage] = useState<{
        labels: string[];
        datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string; pointRadius: number }[];
    }>({
        labels: [],
        datasets: [
            {
                label: 'Memory Usage (%)',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: !vulnerable ? 'rgba(75, 192, 192, 0.2)' : 'red',
                pointRadius: 2,
            },
        ]
    })
    ///now we will be setting the data by caling the socket.io
    useEffect(() => {
        const socket = io('http://localhost:3000');//this is the port we are listening to
        socket.on('memory-usage-change', (usage: number) => {
            const newTimestamp = new Date().toLocaleTimeString();
            //now we need to overlap the previous data so we wil be having a limit of 50 data points
            setMemoryUsage((prevData) => {
                return {
                    labels: [...prevData.labels.slice(-50), newTimestamp],
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: [...prevData.datasets[0].data.slice(-50), usage]
                        }
                    ]

                }
            })
        })
        socket.on('cpu-usage-alert', (vulnerable: boolean) => {
            setVulnerable(vulnerable);
        })
        //destroy the socket connection
        return () => {
            socket.disconnect();
        }
    }, [])
    return (
        <div>
            <h1 style={{textAlign:'center'}}>Memory Usage</h1>
            <Line data={memoryUsage} options={{}} />
        </div>
    )
}

export default MemoryUsage