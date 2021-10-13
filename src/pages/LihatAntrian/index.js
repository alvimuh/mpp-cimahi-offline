import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";

function LihatAntrian() {
  const [data, setData] = useState([
    {
      name: "Handika",
      urutan: "001",
      loket: "1",
    },
    {
      name: "Ayunda",
      urutan: "003",
      loket: "3",
    },
    {
      name: "Cecep",
      urutan: "004",
      loket: "2",
    },
    {
      name: "Danila",
      urutan: "002",
      loket: "4",
    },
    {
      name: "Muhammad Opik",
      urutan: "005",
      loket: "5",
    },
    {
      name: "Jayadi Saputra",
      urutan: "006",
      loket: "6",
    },
    {
      urutan: "008",
      name: "Tia Mutiara",
      loket: "7",
    },
    {
      urutan: "007",
      name: "David",
      loket: "8",
    },
  ]);
  const [calling, setCalling] = useState(false);

  useEffect(() => {
    if (calling) {
      setTimeout(() => {
        setCalling(false);
      }, 5000);
    }
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
