import React from "react";
import "./style.css";
import PropTypes from "prop-types";

function StepIndicator({ lists }) {
  return (
    <ul className="steps-line">
      {lists.map(({ active, label, icon }, index) => (
        <li key={index} className={active ? "active" : ""}>
          <img src={icon} alt={label} />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}

StepIndicator.propTypes = {
  lists: PropTypes.array,
};
export default StepIndicator;
