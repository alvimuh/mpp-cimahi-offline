import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AmbilNomor from "./pages/AmbilNomor/index";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/tukar-kode-booking">
          <div>tukar kode booking</div>
        </Route>
        <Route path="/ambil-nomor">
          <AmbilNomor />
        </Route>
        <Route path="/">
          <div>home</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
