export const Tooltip = ({ hoveredValue, mousePosition }) => {
  if (!hoveredValue) {
    return <div id="tooltip-container" style={{ visibility: "hidden" }}></div>;
  } else {
    const xPosition = mousePosition.x;
    const yPosition = mousePosition.y;
    return (
      <div
        id="tooltip-container"
        style={{ left: `${xPosition + 25}px`, top: `${yPosition - 25}px` }}
      >
        <div>
          <div id="tooltip" data-year={hoveredValue.year}>
            <div>
              <span style={{ fontSize: "1.3rem" }}>{hoveredValue.year}</span>
            </div>
            <div>
              <strong>{hoveredValue.monthName}</strong>
            </div>
            <div>{Number.parseFloat(hoveredValue.temp).toFixed(2)} °C</div>
            <div>{Number.parseFloat(hoveredValue.variance).toFixed(2)}</div>
          </div>
        </div>
      </div>
    );
  }
};