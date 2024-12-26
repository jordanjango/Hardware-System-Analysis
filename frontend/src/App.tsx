import { Chart as ChartJS, registerables } from 'chart.js';
import CPUChart from './components/CPUUsageChart';
import CPUSpeed from './components/CPUSpeed';

ChartJS.register(...registerables); // Register all default modules including the category scale

const App = () => {

  return (
    <div style={{
      display: 'flex',
      padding:'0',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection:'column',
      height: "100vh",
      width: "100vw",
      margin:'20px'
    }}>
      <CPUChart />
      <CPUSpeed />
    </div>
  );
};

export default App;