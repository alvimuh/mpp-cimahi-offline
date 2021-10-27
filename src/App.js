import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AmbilNomor from "./pages/AmbilNomor";
import LihatAntrian from "./pages/LihatAntrian";
import Beranda from "./pages/Beranda";
import AntrianOnline from "./pages/AntrianOnline";
import FeedbackLayanan from "./pages/FeedbackLayanan";
import Survei from "./pages/Survei";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/survei">
          <Survei />
        </Route>
        <Route path="/feedback">
          <FeedbackLayanan />
        </Route>
        <Route path="/lihat-antrian">
          <LihatAntrian />
        </Route>
        <Route path="/ambil-nomor">
          <AmbilNomor />
        </Route>
        <Route path="/antrian-online">
          <AntrianOnline />
        </Route>
        <Route path="/" exact>
          <Beranda />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
