import { Chart as ChartJS, registerables } from 'chart.js';
import CPUChart from './components/CPUUsageChart';
import CPUSpeed from './components/CPUSpeed';
import MemoryUsage from './components/MemoryUsage';
import { ChartProvider } from './context/ChartContext';

ChartJS.register(...registerables); // Register all default modules including the category scale

const App = () => {

  return (
    <ChartProvider>
      <div style={{
        display: 'flex',
        padding: '20px',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        height: "200vh",
        width: "200vw",
        marginLeft: '100px',
      }}>
        <CPUChart />
        <CPUSpeed />
        <MemoryUsage />
      </div>
    </ChartProvider>
  );
};

export default App;