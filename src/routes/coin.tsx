import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link, Route, Routes, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchChangeMoney, fetchCoinInfo, fetchPrice } from "../api";
import Chart from "./chart";
import Price from "./price";
import { BiArrowToLeft } from "react-icons/bi";



const Container = styled.div`
    padding: 0 20px ;
    max-width: 480px ;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh ;
    display:flex ;
    justify-content: center ;
    align-items: center ;
    margin-bottom:50px ;
`;
const Title = styled.h1`
        font-size: 48px;
        color:${(props) => props.theme.accentColor};
`;
const Loder = styled.span`
        text-align:center;
        display: block ;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
 
`;
const Tab = styled.span<{isActive : boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: ${props => props.isActive ? "#17d9d3" :props.theme.textColor};
  
  a{
    display: block ;
    padding: 15px 0px;
    
  }
`;

const Home = styled.div`
  position:fixed ;
  font-size: 50px;
  font-weight: 800;
  left:30px ;
  top:80px ;
`;


interface Istate{
    state:{name:string}
}

interface InfoData{
    id :string;
    name : string;
    symbol : string;
    rank : number;
    is_new : boolean;
    is_active :    boolean;
    type :    string;
    contract :    string;
    platform :    string;
    description :    string;
    message :    string;
    open_source :    boolean;
    development_status :    string;
    hardware_wallet :    boolean;
    proof_type :    string;
    org_structure :    string;
    hash_algorithm :    string;
    first_data_at :    string;
    last_data_at :    string;
   }

interface PriceDta{
    id:string ;
    name:string ;
    symbol:string ;
    rank:number ;
    circulating_supply:number ;
    total_supply:number ;
    max_supply:number ;
    beta_value:number ;
    first_data_at:string ;
    last_updated:string ;
    quotes:{
        USD : {
            ath_date: string ;
            ath_price: number ;
            market_cap: number ;
            market_cap_change_24h: number ;
            percent_change_1h: number ;
            percent_change_1y: number ;
            percent_change_6h: number ;
            percent_change_7d: number ;
            percent_change_12h: number ;
            percent_change_15m: number ;
            percent_change_24h: number ;
            percent_change_30d: number ;
            percent_change_30m: number ;
            percent_from_price_ath: number ;
            price: number ;
            volume_24h: number ;
            volume_24h_change_24h: number ; 
        }
    } ;
    }
    


function Coin() {
const {coinId} = useParams();
const {state} = useLocation() as Istate;
const ChartMatch = useMatch("/:coinId/chart")
const PriceMatch = useMatch("/:coinId/price")

const{isLoading : infoLoading , data : infoData} = useQuery<InfoData>(["info",coinId], () => fetchCoinInfo(coinId))
const{isLoading : PriceLoading , data : PriceData} = useQuery<PriceDta>(["Price",coinId], () => fetchPrice(coinId),{
  refetchInterval: 5000,
})
const {isLoading : ChangeLoading , data : ChangeData} = useQuery<number>(["ChangeMoney",coinId], () => fetchChangeMoney());

const loading = infoLoading || PriceLoading 

const money = Math.imul(
  PriceData?.quotes.USD.price.toFixed(0)  as unknown as number,
  ChangeData?.toFixed(0) as unknown as number,
).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 

   return (
        <Container>
             <Helmet>
              <title>
                {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
              </title>
            </Helmet>
            <Header>
                    <Title>{state?.name ? state.name : loading ? "loading..." : infoData?.name}</Title>
            </Header>  
           
            
           {loading ? (<Loder>"Loading..."</Loder>)
                    : (
                        <>
                        <Home>
                          <Link to="/">
                            <BiArrowToLeft />
                          </Link>
                        </Home>
                        <Overview>
                          <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                          </OverviewItem>
                          <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                          </OverviewItem>
                          <OverviewItem>
                            <span>Price:</span>
                            <span>
                              {money}원
                              </span>
                          </OverviewItem>
                        </Overview>

                        <Description>{infoData?.description}</Description>

                        <Overview>
                          <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{PriceData?.total_supply}</span>
                          </OverviewItem>
                          <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{PriceData?.max_supply}</span>
                          </OverviewItem>
                        </Overview>
                        


                        <Tabs>
                            <Tab isActive={ChartMatch !== null}>
                                <Link to="Chart">차트</Link>
                            </Tab>
                            <Tab isActive={PriceMatch !== null}>
                                <Link to="Price">등락률</Link>
                            </Tab>
                        </Tabs>
                        <Routes>
                            <Route path="chart" element={<Chart  coinId={coinId!}/>}/>
                            <Route path="price" element={<Price coinId={coinId!} won={money!}/>}/>
                        </Routes>
                        </>
                    )
            }
        

        </Container>
   )
}

   

export default Coin;