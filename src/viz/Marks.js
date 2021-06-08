export const Marks = ({
  data,
  xScale,
  xValue,
  yScale,
  yValue,
  monthNumber,
  tempColorScale,
  tempValue,
  barWidth,
  barHeight,
  setHoveredValue,
  handleMouseMove
}) =>
  data.map((d, i) => (
    <>
      <rect
        key={xValue(d) + yValue(d) + tempValue(d)}
        id={xValue(d) + yValue(d) + tempValue(d)}
        data-year={xValue(d)}
        data-month={monthNumber(d) - 1}
        data-temp={tempValue(d)}
        className="cell"
        x={xScale(xValue(d))}
        y={yScale(yValue(d))}
        fill={tempColorScale(tempValue(d))}
        width={barWidth}
        height={barHeight}
        onMouseEnter={() => setHoveredValue(d)}
        onMouseLeave={() => setHoveredValue(null)}
        onMouseMove={handleMouseMove}
      />
    </>
  ));