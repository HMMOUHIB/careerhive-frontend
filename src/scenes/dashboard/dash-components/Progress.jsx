import { BorderAll } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';



const ProgressData = [
  { name: 'Completed', value: 70 },
  { name: 'Remaining', value: 30 },
];

const CircleCharts = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '20px' }}>
    
      

      {/* Progress Chart - Blue for completed, Orange for remaining */}
      <div style={{ width: '200px', height: '200px', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ProgressData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              startAngle={90}
              endAngle={450}
            >
              <Cell key="cell-completed" fill="#4682B4" /> {/* Blue */}
              <Cell key="cell-remaining" fill="#FFA500" />  {/* Orange */}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'lightgrey' }}>70%</div>
          <div style={{color:'white' , fontSize: '12px' }}>This Week</div>
        </div>
      </div>
    </div>
  );
};

export default CircleCharts;