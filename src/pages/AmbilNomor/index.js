import React from "react";
// import PropTypes from "prop-types";
import "./style.css";
import identity from "../../assets/icons/icons8-membership-card-96.png";
import select from "../../assets/icons/icons8-check-all-96.png";
import waiting from "../../assets/icons/icons8-time-card-96.png";
import {
  Switch,
  Link,
  Route,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { AntrianProvider, AntrianConsumer } from "./context";
import PilihLayananTab from "./PilihLayananTab";
import IsiIdentitasTab from "./IsiIdentitasTab";
import LihatAntrian from "./LihatAntrian";

function AmbilNomor() {
  let match = useRouteMatch();
  let location = useLocation();

  return (
    <AntrianProvider>
      <AntrianConsumer>
        {({ state }) => (
          <main>
            <div className="container">
              <h1>Ambil Nomor {state.step}</h1>
              <div className="wrapper">
                <ul className="steps-line">
                  <li className={state.step === 0 || state.step === 1}>
                    {/* <Link to={match.url + "/langkah-1"}> */}
                    <img src={select} alt="Pilih Layanan" />
                    <span>Pilih tenant dan layanan</span>
                    {/* </Link> */}
                  </li>
                  <li className={state.step === 2}>
                    {/* <Link to={match.url + "/langkah-2"}> */}
                    <img src={identity} alt="Isi Identitas" />
                    <span>Isi Identitas</span>
                    {/* </Link> */}
                  </li>
                  <li className={state.step === 3}>
                    {/* <Link to={match.url + "/langkah-3"}> */}
                    <img src={waiting} alt="Ambil Nomor Antrian" />
                    <span>Ambil nomor antrian</span>
                    {/* </Link> */}
                  </li>
                </ul>
                <div className="content">
                  {state.step === 0 || state.step === 1 ? (
                    <PilihLayananTab />
                  ) : state.step === 2 ? (
                    <IsiIdentitasTab />
                  ) : state.step === 3 ? (
                    <LihatAntrian />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </main>
        )}
      </AntrianConsumer>
    </AntrianProvider>
  );
}

// AmbilNomor.propTypes = {};
export default AmbilNomor;
