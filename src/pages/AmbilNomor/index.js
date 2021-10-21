import React from "react";
// import PropTypes from "prop-types";

import { AntrianProvider, useAntrian } from "./context";
import PilihLayananTab from "./PilihLayananTab";
import IsiIdentitasTab from "./IsiIdentitasTab";
import LihatAntrian from "./LihatAntrian";

import identity_icon from "../../assets/icons/icons8-membership-card-96.png";
import select_icon from "../../assets/icons/icons8-check-all-96.png";
import waiting_icon from "../../assets/icons/icons8-time-card-96.png";
import StepIndicator from "../../components/StepIndicator";

function Header() {
  const {
    state: { step },
  } = useAntrian();

  const indicators = [
    {
      label: "Pilih tenant dan layanan",
      icon: identity_icon,
      active: step === 0 || step === 1,
    },
    {
      label: "Isi Identitas",
      icon: select_icon,
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

  if (step === 0 || step === 1) {
    return <PilihLayananTab />;
  } else if (step === 2) {
    return <IsiIdentitasTab />;
  } else if (step === 3 || step === 4) {
    return <LihatAntrian />;
  } else return <></>;
}

function AmbilNomor() {
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
export default AmbilNomor;
