import React, { useEffect, useRef, useState } from "react";
// import PropTypes from "prop-types";
import "./style.css";
import QrReader from "react-qr-reader";
import axios from "axios";
import { useAntrian } from "./context";
import { useAlert } from "react-alert";

function IsiIdentitasTab() {
  const { state, dispatch } = useAntrian();
  const alert = useAlert();
  const [data, setData] = useState({
    kode_pelayanan: "",
  });

  const submitHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      dispatch({
        type: "LOADING",
      });
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/internal/check-phone-number`,
        { ...data, key: process.env.REACT_APP_API_KEY }
      );
      dispatch({
        type: "SET_BOOKING",
        data: res.data,
      });
    } catch (error) {
      alert.show("Oh look, an alert!");
      dispatch({
        type: "STOP_LOADING",
      });
    }
  };

  const inputChangeHandler = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
    if (data.kode_pelayanan) {
      dispatch({
        type: "ENABLE_CTA",
      });
    } else {
      dispatch({
        type: "DISABLE_CTA",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.kode_pelayanan]);

  const ctaRef = useRef(null);

  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <div className="form-group" style={{ margin: "40px 0" }}>
        <label>Cari data</label>
        <input
          style={{ marginTop: "10px" }}
          type="text"
          name="kode_pelayanan"
          value={data.kode_pelayanan}
          onChange={inputChangeHandler}
          placeholder="Masukkan ID Permohonan Masyarakat"
        />
      </div>
      <button
        type="submit"
        className="cta"
        disabled={state.ctaDisabled}
        ref={ctaRef}
      >
        Lanjutkan
      </button>
    </form>
  );
}
// IsiIdentitasTab.propTypes = {};
export default IsiIdentitasTab;
