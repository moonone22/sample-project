import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";


  import Coin from "./routes/coin";
  import Coins from "./routes/coins";
  
  
 
function Router() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:coinId/*" element={<Coin />}/>
                <Route path="/" element={<Coins/>}/>  
            </Routes>
        </BrowserRouter>
    )

    

   
}

export default Router;

