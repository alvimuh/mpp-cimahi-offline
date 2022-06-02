import React, { useEffect, useRef, useState } from "react";
// import PropTypes from "prop-types";
import "./style.css";
import QrReader from "react-qr-reader";
import axios from "axios";
import { useAntrian } from "./context";
import { useAlert, positions } from "react-alert";

function IsiIdentitasTab() {
  const { state, dispatch } = useAntrian();
  const alert = useAlert();
  const [data, setData] = useState({
    kode_booking: "",
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
        `${process.env.REACT_APP_API_URL}/internal/booking/cek`,
        { ...data, key: process.env.REACT_APP_API_KEY }
      );
      if (res.data) {
        dispatch({
          type: "SET_BOOKING",
          data: res.data,
        });
      } else {
        alert.error(
          "Kode booking tidak ditemukan. Pastikan kode yang diisikan sudah benar.",
          {
            position: positions.TOP_CENTER,
          }
        );
      }
    } catch (error) {
      alert.error(
        "Terjadi kesalahan sistem, atau kode booking tidak ditemukan. Silakan coba lagi.",
        {
          position: positions.TOP_CENTER,
        }
      );
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
    if (data.kode_booking) {
      dispatch({
        type: "ENABLE_CTA",
      });
    } else {
      dispatch({
        type: "DISABLE_CTA",
      });
    }
  }, [data.kode_booking]);

  const ctaRef = useRef(null);

  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <div className="row">
        <div className="left">
          <label style={{ display: "block", marginBottom: "8px" }}>Foto</label>
          <QrReader
            delay={300}
            onScan={(r) => {
              if (r && data.kode_booking !== r) {
                new Audio(process.env.PUBLIC_URL + "/sound/ping.mp3").play();
                setData((prev) => ({
                  ...prev,
                  kode_booking: r,
                }));
              }
            }}
          />
        </div>
        <div className="right form-group">
          <div className="form-group">
            <label>Kode Booking</label>
            <input
              type="text"
              name="kode_booking"
              value={data.kode_booking}
              onChange={inputChangeHandler}
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
        </div>
      </div>
    </form>
  );
}
// IsiIdentitasTab.propTypes = {};
export default IsiIdentitasTab;
