export const AxisBottom = ({ xScale, innerHeight, tickOffset }) =>
  xScale.ticks().map((tickValue) => (
    <g
      key={tickValue}
      className="tick"
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <line y2={innerHeight} stroke="#f1f2f3" />
      <text
        style={{ textAnchor: "middle" }}
        dy=".71em"
        y={innerHeight + tickOffset}
      >
        {tickValue}
      </text>
    </g>
  ));