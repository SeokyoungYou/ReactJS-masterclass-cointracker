import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "./api";

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const Container = styled.div``;
const ContainerTab = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;
const PriceTab = styled.div`
  width: 50%;
  height: 30px;
`;
const PriceTabTitle = styled.span`
  display: block;
  align-items: center;
  color: gray;
  margin-bottom: 5px;
`;
const PriceTabValue = styled.span`
  color: ${(props) => props.theme.textColor};
`;
interface PriceProps {
  coinId: string;
}
function Price({ coinId }: PriceProps) {
  const { isLoading: tickersLoading, data: tickerData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000, //50초마다 refetch되게 하기
    }
  );
  console.log(tickerData);
  return (
    <Container>
      <ContainerTab>
        <PriceTab>
          <PriceTabTitle>MARKET CAP</PriceTabTitle>
          <PriceTabValue>{tickerData?.quotes.USD.market_cap}</PriceTabValue>
        </PriceTab>
        <PriceTab>
          <PriceTabTitle>MARKET CAP (24h)</PriceTabTitle>
          <PriceTabValue>
            {tickerData?.quotes.USD.market_cap_change_24h}
          </PriceTabValue>
        </PriceTab>
      </ContainerTab>
      <ContainerTab>
        <PriceTab>
          <PriceTabTitle>CIRCULATING SUPPLY</PriceTabTitle>
          <PriceTabValue>{tickerData?.circulating_supply}</PriceTabValue>
        </PriceTab>
        <PriceTab>
          <PriceTabTitle>VOLUME (24h)</PriceTabTitle>
          <PriceTabValue>{tickerData?.quotes.USD.volume_24h}</PriceTabValue>
        </PriceTab>
      </ContainerTab>
      <ContainerTab>
        <PriceTab>
          <PriceTabTitle>PERCENT CHANGE (1week)</PriceTabTitle>
          <PriceTabValue>
            {tickerData?.quotes.USD.percent_change_7d}
          </PriceTabValue>
        </PriceTab>
        <PriceTab>
          <PriceTabTitle>PERCENT CHANGE (1day)</PriceTabTitle>
          <PriceTabValue>
            {tickerData?.quotes.USD.percent_change_24h}
          </PriceTabValue>
        </PriceTab>
      </ContainerTab>
    </Container>
  );
}

export default Price;
