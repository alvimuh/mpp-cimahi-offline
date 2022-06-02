import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import axios from "axios";
import { useAntrian } from "./context";
import { useAlert, positions } from "react-alert";

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
      if (res.data.kode_pelayanan != null) {
        dispatch({
          type: "SET_BOOKING",
          data: res.data,
        });
      } else {
        alert.error(
          "ID Permohonan masyarakat tidak ditemukan. Pastikan kode yang diisikan sudah benar.",
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
