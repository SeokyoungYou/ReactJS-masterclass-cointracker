import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {
  toggleDark: () => void; // function without return
}
function Router({ toggleDark }: IRouterProps) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins toggleDark={toggleDark} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
