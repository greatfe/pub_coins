import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
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

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const CoinLogo = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const CoinList = styled.ul`
  
`;

const Coin = styled.li`
  background-color: ${props => props.theme.cardBgColor};;
  color:${props => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid white;
  a {
    padding: 20px;
    display: block;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color:${props=>props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function Coins() {
/*   const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async() => {
      const response = await fetch("http://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
 */
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom(prev => !prev);
  const {isLoading, data} = useQuery<ICoin[]>(['allCoins'], fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>
          Coins
        </title>
      </Helmet>

      <Header>
        <Title>Coins</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {isLoading ? <Loader>Loading...</Loader>:
      (<CoinList>
        {data?.slice(0, 100).map(coin => 
          <Coin key={coin.id}>
            <Link to={{
              pathname: `/${coin.id}/chart`,
              state: {name: coin.name},
            }}>
            <CoinLogo 
              src={`https://coinicons-api.vercel.app/api/icon//${coin.symbol.toLowerCase()}`} 
              alt="noImage" />{coin.name} &rarr;</Link>
          </Coin>)}
      </CoinList>)}
    </Container>
  );
}

export default Coins;

// route dom v6.
//             <Link to={`/${coin.id}`} state={{name: coin.name}}>
