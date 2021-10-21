import React from "react";
// import PropTypes from "prop-types";
import { queuePad } from "../../utility";
import { useAntrian } from "./context";

function LihatAntrian() {
  const { state, dispatch } = useAntrian();
  if (state.step === 4) {
    return (
      <div className="result">
        <h3>Berhasil!</h3>
        <button
          type="button"
          onClick={() => {
            dispatch({
              type: "CLEAR",
            });
          }}
        >
          Kembali
        </button>
      </div>
    );
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
          <tr>
            <td>No HP</td>
            <td>:</td>
            <td>{state.antrian?.phone}</td>
          </tr>
          <tr>
            <td>Instansi yang dituju</td>
            <td>:</td>
            <td>{state.antrian?.nama_layanan}</td>
          </tr>
          <tr>
            <td>Layanan terkait</td>
            <td>:</td>
            <td>{state.antrian?.nama_sub_layanan}</td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        className="cta"
        onClick={() => {
          dispatch({
            type: "SWITCH_STEP",
            to: 4,
          });
        }}
      >
        Ambil
      </button>
    </div>
  );
}

// LihatAntrian.propTypes = {};
export default LihatAntrian;
