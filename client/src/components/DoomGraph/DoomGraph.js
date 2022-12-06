import React from "react";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import Paper from "@mui/material/Paper";

const data = [
  { x: 1, y: 30 },
  { x: 2, y: 40 },
  { x: 3, y: 5 },
  { x: 4, y: 2 },
  { x: 5, y: 21 },
];

const DoomGraph = () => {
  return (
    <Paper>
      <Chart data={data} width="800">
        <Title text={"Doom level over the term"} />
        <ArgumentAxis />
        <ValueAxis />

        <LineSeries valueField="y" argumentField="x" />
      </Chart>
    </Paper>
  );
};

export default DoomGraph;
