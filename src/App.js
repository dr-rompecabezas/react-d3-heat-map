import { useData } from './data/useData'
// import { Legend } from './viz/Legend'
import { Marks } from './viz/Marks'
import { AxisBottom } from './viz/AxisBottom'
import { AxisLeft } from './viz/AxisLeft'
import { Tooltip } from './viz/Tooltip'
import { useState, useCallback } from 'react'
const d3 = require('d3')

const titleLabel = "Monthly Global Land-Surface Temperature";
const subtitleLabel = "1753 - 2015 | base temperature 8.66 °C";

const width = 1200;
const height = 500;
const margin = { top: 30, right: 170, bottom: 20, left: 100 };
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

const App = () => {
  const data = useData();
  const [hoveredValue, setHoveredValue] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    },
    [setMousePosition]
  );

  if (!data) {
    return <pre>Loading...</pre>;
  }

  // const variance = (d) => d.variance;
  const monthNumber = (d) => d.month;

  const xValue = (d) => d.year;
  const bottomAxisLabel = "Year";

  const yValue = (d) => d.monthName;

  const tempValue = (d) => d.temp;

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = d3
    .scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight]);

  const tempColorScale = d3
    .scaleQuantize()
    .domain(d3.extent(data, tempValue))
    .range([
      "#0000ff",
      "#0022ff",
      "#0064ff",
      "#00a4ff",
      "#00e4ff",
      "#00ff83",
      "#17ff00",
      "#b0ff00",
      "#FFf000",
      "#FFc800",
      "#FFa000",
      "#FF7800",
      "#FF5000",
      "#FF2800",
      "#FF0000"
    ]);

  const yearsArr = xScale.domain();
  const yearsSpread = yearsArr[1] - yearsArr[0];

  const barWidth = innerWidth / yearsSpread;
  const barHeight = innerHeight / 12;

  return (
    <div>
      <Tooltip hoveredValue={hoveredValue} mousePosition={mousePosition} />
      <div id="viz-container">
        <div id="title">{titleLabel}</div>
        <div id="description">{subtitleLabel}</div>
        <div id="bottom-axis-label">{bottomAxisLabel}</div>
        <svg id="svg" width={width} height={height}>
          {/* <Legend innerWidth={innerWidth} tempColorScale={tempColorScale} tempValue={tempValue} /> */}
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g id="y-axis" className="y-axis">
              <AxisLeft
                yScale={yScale}
                innerWidth={innerWidth}
                tickOffset={12}
              />
            </g>
            <g id="x-axis" className="x-axis">
              <AxisBottom
                xScale={xScale}
                innerHeight={innerHeight}
                tickOffset={8}
              />
            </g>
            <Marks
              data={data}
              xScale={xScale}
              xValue={xValue}
              yScale={yScale}
              yValue={yValue}
              monthNumber={monthNumber}
              tempColorScale={tempColorScale}
              tempValue={tempValue}
              barWidth={barWidth}
              barHeight={barHeight}
              setHoveredValue={setHoveredValue}
              handleMouseMove={handleMouseMove}
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default App;
