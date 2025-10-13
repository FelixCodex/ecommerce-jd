import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export function RadialChart({
  label,
  percent,
  height,
}: {
  label: string;
  percent: number;
  height: number;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, setState] = useState({
    series: [percent],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "50%",
          },
        },
      },
      labels: [label],
      grid: { padding: { left: -23, right: -23, top: -23, bottom: -23 } },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options as ApexOptions}
          series={state.series}
          type="radialBar"
          height={height}
          width={height}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
