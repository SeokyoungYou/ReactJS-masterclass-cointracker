import { useQuery } from "react-query";
import { fetchCoinHistory, fetchCoinTickers } from "./api";
import ApexChart from "react-apexcharts";
interface IHistorical {
  //Devtools에서 복붙
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000, //50초마다 refetch되게 하기
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[{ name: "Price", data: data?.map((price) => price.close) }]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 200,
              width: 500,
              toolbar: {
                show: false, // 다운로드, 줌인 툴바 없애기
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              // 그래프 선
              curve: "smooth",
              width: 3,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: {
                show: false,
              },
              type: "datetime", // 축 이름을 날짜형식으로
              categories: data?.map((price) => price.time_close), //x축을 날짜로
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              // 커서 올려진 값
              y: {
                formatter: (value) => `$${value.toFixed(2)}`, // 소수점 아래 두자리
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
