import React, { createContext, useState, ReactNode } from 'react';

interface ChartContextInterface {
    labels: string[];
    datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string; pointRadius: number }[];
}

const initialState: ChartContextInterface = {
    labels: [],
    datasets: [
        {
            label: 'CPU Usage (%)',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            pointRadius: 0,
        },
    ],
};

interface ChartProviderProps {
    children: ReactNode;
}

export const ChartContext = createContext<{
    cpuUsageData: ChartContextInterface;
    setCpuUsageData: React.Dispatch<React.SetStateAction<ChartContextInterface>>;
    vulnerable?: boolean;
    setVulenerable?: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    cpuUsageData: initialState,
    setCpuUsageData: () => { },
    vulnerable: false,
    setVulenerable: () => { },
});

export const ChartProvider = ({ children }: ChartProviderProps) => {
    const [cpuUsageData, setCpuUsageData] = useState<ChartContextInterface>(initialState);
    const [vulnerable, setVulenerable] = useState<boolean>(false);
    return (
        <ChartContext.Provider value={{ cpuUsageData, setCpuUsageData, vulnerable, setVulenerable }}>
            {children}
        </ChartContext.Provider>
    );
};