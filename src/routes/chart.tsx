import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts"
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";



interface ChartProps{
  coinId: string;

}
interface Iohlcv {
  time_open: number ;
  time_close: number ;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: string;
}
//<Route path="chart" element={<Chart coinId={coinId!}/>}/>
// 속성 coinId={coinId}



function Chart({coinId} : ChartProps){

  const isDark = useRecoilValue(isDarkAtom)
  const {isLoading, data} = useQuery<Iohlcv[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId!));
  console.log(data)
  return  (
  <div>
    {isLoading 
    ? "Loading... "
    : <ApexChart 
    type="candlestick" 
    series={[
        {
        data: data?.map((price) => {
        return{
        x: price.time_close * 1000,
        y: [price.open, price.high, price.low, price.close]
        }
        })
        },
        ] as any}
    options={{
        theme: {
            mode: isDark ? "dark" : "light",
        },
        chart:{
            height: 300 ,
            width: 500,
            toolbar:{
                show: false,
            },
            background: "transparent" ,
        },
        
        
        xaxis:{
            type:"datetime",
            
            labels:{
                show:false,
                datetimeFormatter: {month: "mmm'yy"} ,
            },                  
            
        },
        
        
        
    }}
    /> }
    </div>
  )
}

export default Chart