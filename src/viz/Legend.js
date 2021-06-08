import { useEffect, useRef } from 'react';
// import legend from 'd3-svg-legend'
// eslint-disable-next-line
import { legendColor } from 'd3-svg-legend'
const d3 = require('d3')

export const Legend = ({ innerWidth, tempColorScale }) => {
  const ref = useRef();

  useEffect(() => {
    const legendG = d3.select(ref.current);
    const colorLegend = d3
      .legendColor()
      .labelFormat(d3.format(".2f"))
      .useClass(false)
      .title("Temperature Range in °C")
      .titleWidth(100)
      .scale(tempColorScale);
    legendG.call(colorLegend);
  }, [tempColorScale]);

  return (
    <g
      ref={ref}
      id="legend"
      className="legendQuant"
      transform={`translate(${innerWidth + 130}, 50)`}
    />
  );
};