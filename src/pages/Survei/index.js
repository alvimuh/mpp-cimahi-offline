import React from "react";
// import PropTypes from "prop-types";
import "./style.css";

import { AntrianProvider, useAntrian } from "./context";
import FotoTab from "./FotoTab";
import ScanTab from "./ScanTab";
import IsiSurvei from "./IsiSurvei";

import identity_icon from "../../assets/icons/icons8-membership-card-96.png";
import waiting_icon from "../../assets/icons/icons8-time-card-96.png";
import ask_icon from "../../assets/icons/icons8-ask-question-96.png";
import StepIndicator from "../../components/StepIndicator";
import LihatAntrian from "./LihatAntrian";

function Header() {
  const {
    state: { step },
  } = useAntrian();

  const indicators = [
    {
      label: "Cari Data",
      icon: identity_icon,
      active: step === 0,
    },
    {
      label: "Konfirmasi Data",
      icon: identity_icon,
      active: step === 1,
    },
    {
      label: "Isi Survei",
      icon: ask_icon,
      active: step === 2,
    },
    {
      label: "Ambil Nomor Antrian",
      icon: waiting_icon,
      active: step === 3 || step === 4,
    },
  ];
  return <StepIndicator lists={indicators} />;
}

function StepSwitch() {
  const {
    state: { step },
  } = useAntrian();

  if (step === 0) {
    return <ScanTab />;
  } else if (step === 1) {
    return <FotoTab />;
  } else if (step === 2) {
    return <IsiSurvei />;
  } else if (step === 3 || step === 4) {
    return <LihatAntrian />;
  } else return <></>;
}

function Survei() {
  return (
    <AntrianProvider>
      <main>
        <div className="container">
          <div className="wrapper">
            <Header />
            <div className="content">
              <StepSwitch />
            </div>
          </div>
        </div>
      </main>
    </AntrianProvider>
  );
}

// AmbilNomor.propTypes = {};
export default Survei;
