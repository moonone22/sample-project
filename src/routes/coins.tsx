import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import crypicon from "base64-cryptocurrency-icons"
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import { BiAdjust } from "react-icons/bi";


const Aicon = styled.div`
    position: fixed;
    right: 0;
svg{
    width:50px ;
    height: 50px;
}

button{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: none;
    border-radius: 15px;
    color: gray;
    border: none;
}
`;

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
`;

const CoinList = styled.ul``;

const Coin = styled.li`
        background: linear-gradient(162deg, #4ac7d9, #10466e);
    color: ${ props => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a{
        transition: color 0.5s ease-in ;
        display: flex ;
        padding: 20px ;
        align-items: center ;
    }
    &:hover{
        a{
            color:${props => props.theme.accentColor};
        }
    }

`;

const Title = styled.h1`
        font-size: 48px;
        color:${(props) => props.theme.accentColor};
`;

const Loder = styled.span`
        text-align:center;
        display: block ;
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px ;
`;
const Input = styled.input`

`;

interface ICoins {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}



function Coins() {
    const setterFn = useSetRecoilState(isDarkAtom)
    const toggleDarkAtom = () => setterFn(current => !current)
    const {isLoading,data} = useQuery<ICoins[]>("allCoins", fetchCoins)


    return (
        <Container>
            <Helmet>
              <title>
                 코인
              </title>
            </Helmet>

            <Header>
                <Title>코인</Title>
                
                <Aicon>
                <button onClick={toggleDarkAtom}><BiAdjust />dack mode</button>
                </Aicon>
            
                
            </Header>
            
            
           {isLoading ? (<Loder>"Loading..."</Loder>)
                    : (
                        <CoinList>
                        {data?.slice(0,100)?.map( coin  => 
                            <Coin key={coin.id}>
                                <Link to= {`/${coin.id}`} state={{name : coin.name}} >
                                    <Img 
                                    src={crypicon[coin.symbol.toUpperCase()]?.icon}
                                    />
                                    {coin.name} &rarr;
                                </Link>
                            </Coin>
                                        )}
                        </CoinList> 
                    
                        
                    )
        }
        

        </Container>
        
    )
}

   

export default Coins;