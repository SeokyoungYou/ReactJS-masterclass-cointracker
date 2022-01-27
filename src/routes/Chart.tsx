import { useQuery } from "react-query";
import { fetchCoinHistory, fetchCoinTickers } from "./api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";
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
  const isDark = useRecoilValue(isDarkAtom);
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
          series={[
            {
              type: "candlestick",
              name: "Price",
              data: data?.map((price) => ({
                x: price.time_close, // Thursday
                y: [price.open, price.high, price.low, price.close],
              })),
            },
          ]}
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
            yaxis: {
              show: false,
              tooltip: {
                enabled: false,
              },
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: {
                show: false,
              },
              type: "datetime", // 축 이름을 날짜형식으로
            },
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
