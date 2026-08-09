import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Activities = [
  { formation: 'React_JS', Employés: 10 },
  { formation: 'Python', Employés: 20 },
  { formation: 'Symfony', Employés: 40 },
  { formation: 'Marketing', Employés: 14 },
  { formation: 'Flutter', Employés: 33 },
];

const colors = ['#4682B4', '#5F9EA0', '#87CEEB', '#FF69B4', '#FF6347']; // Unique colors for each formation

const CircleChart = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px' }}>
      {/* Left side for the pie chart */}
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width={250} height={250}> {/* Adjusted size for smaller chart */}
          <PieChart>
            <Pie
              data={Activities}
              dataKey="Employés"
              nameKey="formation"
              cx="50%"       // Center X position
              cy="50%"       // Center Y position
              innerRadius={40}     // Radius from the center to the start of the arc
              outerRadius={80}     // Radius from the center to the end of the arc
              paddingAngle={5}     // Space between each arc
              cornerRadius={8}     // Rounded corners for each arc
              startAngle={90}      // Start of the chart (top)
              endAngle={450}       // End of the chart (full circle)
              label={({ name, value }) => `${name}: ${value}`} // Show formation name and value inside the chart
              labelStyle={{ fontSize: '12px', fill: '#004D73' }}
            >
              {Activities.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            {/* Tooltip with custom styles */}
            <Tooltip 
              formatter={(value, name) => {
                return [`${name}: ${value} Employees`, 'Formation'];
              }} 
              contentStyle={{
                backgroundColor: '#d3d3d3',  // Grey background
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '5px 10px', // Smaller padding for the tooltip
                fontSize: '8px',      // Smaller font size (8px)
              }}
              itemStyle={{
                fontSize: '8px', // Adjust the font size for the tooltip text
                color: '#000',   // Text color
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Right side for the legend */}
      <div style={{ marginLeft: '20px', flex: 1 }}>
        <Legend 
          verticalAlign="top" 
          height={20} 
          layout="vertical" 
          align="right" 
          wrapperStyle={{ textAlign: 'left', color: '#004D73' }} 
        />
      </div>
    </div>
  );
};

export default CircleChart;
