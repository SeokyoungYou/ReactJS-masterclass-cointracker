import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    display: flex;
    align-items: center;
    padding: 20px; // 여기에 넣으면 link 범위가 커짐
    transition: color 0.2s ease-in-out;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const ToggleBtn = styled.input`
  -webkit-appearance: none;
  width: 80px;
  height: 20px;
  position: relative;
  border-radius: 5px;
  outline: none;
  background-color: gray;
  transition: all 1s;
  display: flex;
  align-items: center;
  &:before {
    content: "🌚";
    font-size: 20px;
    width: 100%;
    transform: translate(0%);
    transition: all 1s;
  }
  &:checked {
    background-color: skyblue;
    transition: all 1s;
  }
  &:checked:before {
    content: "🌞";
    transform: translate(70%);
    transition: all 1s;
  }
`;
const Loader = styled.span`
  text-align: center;
`;
interface ICoin {
  //2-1)
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoinsPRops {
  toggleDark: () => void; // function without return
}
function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkatom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>("all coins", fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>코인 </title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <ToggleBtn type="checkbox" onClick={toggleDarkatom}></ToggleBtn>
      </Header>
      {isLoading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;
