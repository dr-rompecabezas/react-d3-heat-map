export const AxisLeft = ({ yScale, innerWidth, tickOffset }) =>
  yScale.domain().map((tickValue) => (
    <g
      key={tickValue}
      className="tick"
      transform={`translate(0,${yScale(tickValue) + yScale.bandwidth() / 2})`}
    >
      <line x2={innerWidth} stroke="#f1f2f3" />
      <text style={{ textAnchor: "end" }} x={-tickOffset} dy=".32em">
        {tickValue}
      </text>
    </g>
  ));