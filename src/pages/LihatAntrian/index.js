import React, { useState } from "react";
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
  //   if(live update){
  //     return(
  //         "tampilkan nomor, nama, foto"
  //     )
  //   }
  return (
    <main>
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
