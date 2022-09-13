import { useQuery } from "@tanstack/react-query";
import ApexChart from "react-apexcharts";
import { fetchCoinHistory } from "../api";

interface IHistorycal {
  time_open: number,
  time_close: number,
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
  market_cap: number,
}
interface ChartProps {
  coinId:string
}

function CandleChart({coinId}:ChartProps) {
  const {isLoading, data} = useQuery<IHistorycal[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId));

  console.log(data?.map(price => parseInt(price.close)));
  console.log(data?.map((price) => Unix_timestamp(price.time_close)));

  let candleData;
  if(data != undefined) {
      candleData = data.map(info => (
      {
        x: Unix_timestamp(info.time_close),
        y: [parseInt(info.open), parseInt(info.high), parseInt(info.low), parseInt(info.close)],
      })
    );
  }
  else {
    candleData = [0];
  }
  console.log(candleData);

  return <div>
    {isLoading ? 'Loading Chart...' : 
      <ApexChart 
        type="candlestick" 
        series={[
          {
            data: candleData,
          },
        ]}
        options={{
          theme: {
            mode: 'dark',
          },
          chart: {
            type: "candlestick",
            height: 300,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: {
            show: false,
          },
          stroke: {
            curve: "smooth",
            width: 5,
          },
          yaxis: {
            show: false,
          },
          xaxis: {
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
            },
            type: "datetime",
          },
          fill: {
            type: "gradient",
            gradient: {
              gradientToColors: ['#0be881'],
              stops: [0, 100]
            }
          },
          colors: ['#0fbcf9'],
          tooltip: {
            y: {
              formatter: (value) => `$${value.toFixed(3)}`,
            }
          }
        }}
        />}
  </div>;
}

function Unix_timestamp(t:number) {
  var date = new Date(t*1000);
  var year = date.getFullYear();
  var month = "0" + (date.getMonth()+1);
  var day = "0" + date.getDate();
  var hour = "0" + date.getHours();
  var minute = "0" + date.getMinutes();
  var second = "0" + date.getSeconds();
  return year + "-" + month.substr(-2) + "-" + day.substr(-2) ;
}
export default CandleChart;