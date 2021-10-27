import React from "react";
// import PropTypes from "prop-types";
import "./style.css";

import { AntrianProvider, useAntrian } from "./context";
import FotoTab from "./FotoTab";
import ScanTab from "./ScanTab";
import LihatAntrian from "./LihatAntrian";

import identity_icon from "../../assets/icons/icons8-membership-card-96.png";
import qr_icon from "../../assets/icons/icons8-ringing-phone-96.png";
import waiting_icon from "../../assets/icons/icons8-ask-question-96.png";
import StepIndicator from "../../components/StepIndicator";

function Header() {
  const {
    state: { step },
  } = useAntrian();

  const indicators = [
    {
      label: "Masukan Nomor Telepon",
      icon: qr_icon,
      active: step === 0,
    },
    {
      label: "Konfirmasi Data",
      icon: identity_icon,
      active: step === 1,
    },
    {
      label: "Isi Survei",
      icon: waiting_icon,
      active: step === 2 || step === 3,
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
  } else if (step === 2 || step === 3) {
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
