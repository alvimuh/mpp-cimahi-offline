import React from "react";
import "./style.css";
import not_found_icon from "../../assets/icons/search.png";

export default function DataNotFound({ title = "Data" }) {
  return (
    <div className="data-not-found">
      <img src={not_found_icon} alt="not found" />
      <h3>{title} tidak ditemukan</h3>
    </div>
  );
}
