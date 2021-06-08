import { useState, useEffect } from 'react'
const d3 = require('d3')

export const useData = () => {
  const [data, setData] = useState(null);
  // eslint-disable-next-line
  const [loaded, setLoaded] = useState(false);
  
  const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
  
  useEffect(() => {
    d3.json(url).then((json) => {
      setData(json.monthlyVariance);
    });
  }, []);

  useEffect(() => {
    if (data) {
      data.forEach((d) => {
        let month = d.month - 1;
        d.monthName = new Date(1976, month, 28).toLocaleString("default", {
          month: "long"
        });
        d.temp = d.variance + 8.66;
      });
      setLoaded(true);
    }
  }, [data]);
  
  return data
}