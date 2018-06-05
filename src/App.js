import React, { Component } from 'react';
import './App.css';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  Legend,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const data = [
  {name: '2018/3/26', spend: 4000, contacts: 500, evt: null },
  {name: '2018/3/27', spend: 3000, contacts: 600, evt: 'buy' },
  {name: '2018/3/28', spend: 2000, contacts: 700, evt: null },
  {name: '2018/3/29', spend: 2780, contacts: 710, evt: 'change' },
  {name: '2018/3/30', spend: 18, contacts: 650, evt: null },
  {name: '2018/4/1', spend: 2390, contacts: 660, evt: null },
  {name: '2018/4/2', spend: 3490, contacts: 700, evt: null },
  {name: '2018/4/3', spend: 4000, contacts: 500, evt: null },
  {name: '2018/4/4', spend: 3000, contacts: 600, evt: 'buy' },
  {name: '2018/4/5', spend: 2000, contacts: 700, evt: null },
  {name: '2018/4/6', spend: 2780, contacts: 710, evt: 'change' },
  {name: '2018/4/7', spend: 18, contacts: 650, evt: null },
  {name: '2018/4/8', spend: 2390, contacts: 660, evt: null },
  {name: '2018/4/9', spend: 3490, contacts: 700, evt: null },
  {name: '2018/4/10', spend: 2390, contacts: 660, evt: null },
  {name: '2018/4/11', spend: 3490, contacts: 700, evt: null },
  {name: '2018/4/12', spend: 4000, contacts: 500, evt: null },
  {name: '2018/4/13', spend: 3000, contacts: 600, evt: 'buy' },
  {name: '2018/4/14', spend: 2000, contacts: 700, evt: null },
  {name: '2018/4/15', spend: 2780, contacts: 710, evt: 'change' },
  {name: '2018/4/16', spend: 18, contacts: 650, evt: null },
  {name: '2018/4/17', spend: 2390, contacts: 660, evt: null },
  {name: '2018/4/18', spend: 3490, contacts: 700, evt: null },
  {name: '2018/4/19', spend: 3000, contacts: 600, evt: 'buy' },
  {name: '2018/4/20', spend: 2000, contacts: 700, evt: null },
  {name: '2018/4/21', spend: 2780, contacts: 710, evt: 'change' },
  {name: '2018/4/22', spend: 18, contacts: 650, evt: null },
  {name: '2018/4/23', spend: 2390, contacts: 660, evt: null },
  {name: '2018/4/24', spend: 3490, contacts: 700, evt: null },
];

const pieChartData = [
  {name: 'ReachSearch', value: 49104},
  {name: 'Other', value: 6034}
]


const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 5;

  return value ? (
    <g className="event-label">
      <defs>
        <filter id="drop-shadow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feFlood floodColor="#424242"/>
          <feComposite in2="offsetblur" operator="in"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle
        cx={x + width / 2}
        cy={y + height}
        r={radius}
        fill="white"
        fillOpacity="0.5"
        stroke="white"
        strokeWidth="2"
        filter="url(#drop-shadow)"
      />
      <text x={x-10} y={y + height-20}>Event</text>
    </g>
  ) : null;
};

const TooltipContents = ({ label, payload }) => (
  <div>
    <p className="label">{label}</p>
    {payload.map(item => (
      <div key={item.dataKey}>
        <svg viewBox="0 0 100 100" width="6">
          <circle cx="50" cy="50" r="50" fill={item.fill} />
        </svg>
        {item.dataKey}: {item.value}
      </div>
    ))}
  </div>
)

const renderTooltip = props => {
  if (props.active) {
    return (
      <div className="custom-tooltip">
        <TooltipContents
          label={props.label}
          payload={props.payload}
        />
      </div>
    );
  }

  return null;
}

const renderAltTooltip = props => {
  const tooltipStyles = {
    position: 'absolute',
    left: props.coordinate.x
  }
  if (props.active) {
    return (
      <div className="custom-tooltip alt-tooltip" style={tooltipStyles}>
        <TooltipContents
          label={props.label}
          payload={props.payload}
        />
      </div>
    );
  }

  return null;
}

const getPath = (x, y, width, height) => {
  const h = height === 0 ? 5 : height;
  return `
    M ${x} ${y + h}
    H ${x + width}
    V ${y + 4}
    Q ${x + width} ${y}, ${x + width - 4} ${y}
    H ${x + 4}
    Q ${x} ${y}, ${x} ${y + 4}
    V ${y + h}
  `
};

const RoundedBar = ({ fill, x, y, width, height }) => (
  <path d={getPath(x, y, width, height)} fill={fill} />
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <ComposedChart
          width={1000}
          height={300}
          data={data}
          margin={{top: 100, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="name" minTickGap={30} tickLine={false} tickMargin={10} axisLine={false} tick={{fontSize: '10px', letterSpacing: '1px', color: '#404040'}} />
          <YAxis yAxisId="left" hide={true} />
          <YAxis yAxisId="right" orientation="right" hide={true} />
          <Bar yAxisId="left" dataKey="spend" minPointSize={5} fill="#6DCA9A" shape={<RoundedBar/>}>
            <LabelList dataKey="evt" content={renderCustomizedLabel} />
          </Bar>
          <Tooltip content={renderTooltip} cursor={{ stroke: 'white', strokeWidth: 1 }} />
          <Area yAxisId="right" type="linear" dataKey="contacts" fill="#1DA0F6" fillOpacity="0.15" stroke="#1DA0F6" strokeWidth="2" dot={false} activeDot={{r: 6}}/>
        </ComposedChart>

        <ComposedChart
          width={1000}
          height={300}
          data={data}
          margin={{top: 100, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="name" minTickGap={30} tickLine={false} tickMargin={10} axisLine={false} tick={{fontSize: '10px', letterSpacing: '1px', color: '#404040'}} />
          <YAxis yAxisId="left" hide={true} />
          <YAxis yAxisId="right" orientation="right" hide={true} />
          <Bar yAxisId="left" dataKey="spend" minPointSize={5} fill="#6DCA9A" shape={<RoundedBar/>}>
            <LabelList dataKey="evt" content={renderCustomizedLabel} />
          </Bar>
          <Tooltip content={renderAltTooltip} cursor={{ stroke: 'white', strokeWidth: 1 }} position={{ x: 0, y: 0 }} />
          <Area yAxisId="right" type="linear" dataKey="contacts" fill="#1DA0F6" fillOpacity="0.15" stroke="#1DA0F6" strokeWidth="2" dot={false} activeDot={{r: 6}}/>
        </ComposedChart>

        <PieChart width={800} height={400}>
          <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={100} outerRadius={150} fill="#82ca9d" label paddingAngle={2}>
            { pieChartData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>) }
          </Pie>
          <text x="50%" y="47.5%" width="100px" style={{transform: 'translateX(-50px)', fontSize: '27px'}}>$55,138</text>
          <text x="50%" y="52.5%" width="100px" fill="#adadad" style={{transform: 'translateX(-45px)'}}>Total Budget</text>
          <Tooltip/>
          

        </PieChart>
      </div>
    );
  }
}

export default App;
