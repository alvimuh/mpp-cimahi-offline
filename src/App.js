import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AmbilNomor from "./pages/AmbilNomor";
import LihatAntrian from "./pages/LihatAntrian";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/lihat-antrian">
          <LihatAntrian />
        </Route>
        <Route path="/ambil-nomor">
          <AmbilNomor />
        </Route>
        <Route path="/"></Route>
      </Switch>
    </Router>
  );
}

export default App;
