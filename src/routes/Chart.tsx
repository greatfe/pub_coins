import { useQuery } from "@tanstack/react-query";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { fetchCoinHistory } from "../api";
import { isDarkAtom } from "../atoms";

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

function Chart({coinId}:ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const {isLoading, error, data, status} = 
    useQuery<IHistorycal[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId));

  if(error ) {
    console.log('Not Found data...');
    return <div>
      Not Found data...
    </div>
  }
  else{
    console.log(data?.map(price => parseInt(price.close)));
    console.log(data?.map((price) => Unix_timestamp(price.time_close)));
  }

  return <div>
    {isLoading ? 'Loading Chart...' : 
     status === "error" ? 'Error...' :
      <ApexChart 
        type="line" 
        series={[
          {
            name: 'close price',
            data: data?.map(price => parseInt(price.close)) as number[],
          },
        ]}
        options={{
          theme: {
            mode: isDark ? "dark" : "light",
          },
          chart: {
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
            categories: data?.map((price) => Unix_timestamp(price.time_close)),
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
export default Chart;