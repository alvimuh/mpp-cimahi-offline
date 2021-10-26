import React from "react";
import { Link } from "react-router-dom";
import IconDisplay from "../../assets/icons/icons8-counter-96.png";
import IconOnline from "../../assets/icons/icons8-approved-delivery-96.png";
import IconOffline from "../../assets/icons/icons8-check-96.png";
import IconAsk from "../../assets/icons/icons8-ask-question-96.png";
import IconStar from "../../assets/icons/icons8-star-96.png";

function Beranda() {
  const menu = [
    {
      link: "/lihat-antrian",
      label: "Display Antrian",
      icon: IconDisplay,
    },
    {
      link: "/antrian-online",
      label: "Antrian Online",
      icon: IconOnline,
    },
    {
      link: "/ambil-nomor",
      label: "Antrian Offline",
      icon: IconOffline,
    },
    {
      link: "/feedback-layanan",
      label: "Feedback Layanan",
      icon: IconStar,
    },
    {
      link: "/survei-kepuasan",
      label: "Survei Kepuasan",
      icon: IconAsk,
    },
  ];
  return (
    <main>
      <div className="container v-center">
        <div className="menu">
          {menu.map((item) => (
            <Link to={item.link} className="menu-item">
              <div>
                <img src={item.icon} alt={item.label} />
                <h4>{item.label}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Beranda;
