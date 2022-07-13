import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPrice } from "../api";

const Loder = styled.span`
        text-align:center;
        display: block ;
`;
const Container = styled.div`
        display:flex ;
        flex-direction: column ;
          
        div:nth-child(2n){
            margin-left:230px ;
        };

`;
const PriceContainer = styled.div<{isActive : boolean}>`
        width: 200px ;
        height: 50px ;
        border-radius: 10px ;
        margin-bottom:10px ;
        background: ${props => props.isActive ? "linear-gradient(348deg, #2662a7, transparent);": "linear-gradient(348deg, #ca1a1a, transparent);"};
        box-shadow: 10px 10px 30px black;
        display: flex ;
        justify-content: center ;
        align-items: center ; 
`;


interface IPrice {
    coinId: string;
    won: string;
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


function Price({coinId,won} :IPrice){
const{isLoading : PriceLoading , data : PriceData} = useQuery<PriceDta>(["Price",coinId], () => fetchPrice(coinId),{
        refetchInterval: 5000,
      })
    return (
        PriceLoading 
        ? (<Loder>"Loading..."</Loder>)
        : (
            <Container>
            
                <PriceContainer  isActive={PriceData?.quotes.USD.percent_change_1h as unknown as number > 0}>
                    1시간전 : {PriceData?.quotes.USD.percent_change_1h}%
                </PriceContainer>

                <PriceContainer isActive={PriceData?.quotes.USD.percent_change_6h as unknown as number > 0} >
                    6시간전 : {PriceData?.quotes.USD.percent_change_6h}%
                </PriceContainer>

                <PriceContainer isActive={PriceData?.quotes.USD.percent_change_24h as unknown as number > 0}
                >25시간전 : {PriceData?.quotes.USD.percent_change_24h}%
                </PriceContainer>

                <PriceContainer isActive={PriceData?.quotes.USD.percent_change_7d as unknown as number > 0}>
                    7일전 : {PriceData?.quotes.USD.percent_change_7d}%
                </PriceContainer>

                <PriceContainer isActive={PriceData?.quotes.USD.percent_change_30d as unknown as number > 0}>
                    30일전 : {PriceData?.quotes.USD.percent_change_30d}%
                    </PriceContainer>

                <PriceContainer isActive={PriceData?.quotes.USD.percent_change_1y as unknown as number > 0}>
                    1년전 : {PriceData?.quotes.USD.percent_change_1y}%
                </PriceContainer>
            
            </Container>
        )
        
    )
}

export default Price