import * as React from 'react';
import { Chart } from "react-google-charts";

export default function ChartComponent(props) {
  // const options = {
  //   chart: {
  //     title: "Student Performance",
  //     subtitle: "Sales, Expenses, and Profit: 2014-2017",
  //   },
  // };
  

  return (
    <>
    <Chart
      chartType={props.chartType}
      width="100%"
      height="300px"
      data={props.data}
      options={props.dataoption}
    />
    </>
    // <BarChart
    //   xAxis={[{ scaleType:'band', data: ['Jan', 'Feb', 'mar', 'april', 'May', 'Jun', 'Jul', 'Aug','Sept', 'Oct', 'Nov', 'Dec'] }]}
    //   series={[{ data: [30,40,56,78,43,32,23,20,65,34,56,15] }]}
    //   height={280}
    // />
  );
}