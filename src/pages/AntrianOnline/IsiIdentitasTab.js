import React, { useEffect, useState } from "react";
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
    kode_booking: "",
    avatar: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({
        type: "LOADING",
      });
      let formdata = new FormData();
      const avaBlob = await (await fetch(data.avatar)).blob();
      formdata.append("key", process.env.REACT_APP_API_KEY);
      formdata.append("kode_booking", data.kode_booking);
      formdata.append("avatar", avaBlob, `foto_${data.name}.jpg`);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/internal/antrian`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({
        type: "SET_ANTRIAN",
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
    console.log(data.kode_booking);
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
              name="kode_booking"
              value={data.kode_booking}
              onChange={inputChangeHandler}
            />
          </div>
          <button type="submit" className="cta" disabled={state.ctaDisabled}>
            Lanjutkan
          </button>
        </div>
      </div>
    </form>
  );
}
// IsiIdentitasTab.propTypes = {};
export default IsiIdentitasTab;
