import React from "react";
// import PropTypes from "prop-types";
import "./style.css";
import { queuePad } from "../../utility";
import { useAntrian } from "./context";
import { useHistory } from "react-router";

function LihatAntrian() {
  const { state, dispatch } = useAntrian();
  const history = useHistory();
  if (state.antrian === null) {
    dispatch({
      type: "CLEAR",
    });
    history.push("/ambil-nomor/langkah-1");
  }
  return (
    <div className="result">
      <h4>Nomor Antiran:</h4>
      <h1>{queuePad(state.antrian?.urutan)}</h1>
      <table>
        <tbody>
          <tr>
            <td>NIK</td>
            <td>:</td>
            <td>{state.antrian?.nik}</td>
          </tr>
          <tr>
            <td>Nama Lengkap</td>
            <td>:</td>
            <td>{state.antrian?.name}</td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        className="cta"
        onClick={() => {
          dispatch({
            type: "CLEAR",
          });
          history.push("/ambil-nomor/langkah-1");
        }}
      >
        Ambil
      </button>
    </div>
  );
}

// LihatAntrian.propTypes = {};
export default LihatAntrian;
