import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";
import axios from 'axios';

function LihatAntrian() {
  const [data, setData] = useState([]);
  const [calling, setCalling] = useState(false);

  const fetchLayanan = async () => {
     
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/antrian-display`
    );
    console.log(res.data);

    setData(res.data);
   
  };
  

  useEffect(() => {
    if (calling) {
      setTimeout(() => {
        setCalling(false);
      }, 5000);
    }
    fetchLayanan();

  }, [calling]);

  if (calling) {
    return (
      <main id="calling">
        <div className="left">
          <h1>Nomor Antrian:</h1>
          <p>300</p>
        </div>
        <div className="right">Hello</div>
      </main>
    );
  }
  return (
    <main>
      <button
        style={{
          position: "absolute",
          bottom: 25,
          left: 25,
        }}
        onClick={() => {
          setCalling(true);
        }}
      >
        Simulasi
      </button>
      <div className="grid">
        {data.map((item) => (
          <div className="item">
            <h3>{item.urutan}</h3>
            <p className="name">{item.name}</p>
            <p className="locket">LOKET {item.loket}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

LihatAntrian.propTypes = {};
export default LihatAntrian;
