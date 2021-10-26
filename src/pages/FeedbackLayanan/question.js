import React, { useState } from "react";
import PropTypes from "prop-types";
import IconRating1 from "../../assets/icons/icons8-disappointed-96.png";
import IconRating2 from "../../assets/icons/icons8-boring-96.png";
import IconRating3 from "../../assets/icons/icons8-happy-96.png";
import IconRating4 from "../../assets/icons/icons8-smiling-96.png";
import IconRating5 from "../../assets/icons/icons8-in-love-96.png";
import { useEffect } from "react/cjs/react.development";

function Question({ question, rateChanged, loading, selected }) {
  const [contentClass, setContentClass] = useState("");

  useEffect(() => {
    rateChanged(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    setContentClass("content fadeinFromSmall");
    const interval = setInterval(() => {
      setContentClass("content");
    }, 1000);
    return () => clearInterval(interval);
  }, [question]);

  return (
    <div className={contentClass}>
      <h2 className="question">{question}</h2>
      <div
        className="select"
        style={{
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
        }}
      >
        <button
          className={`item ${selected === 1 && "active"}`}
          onClick={() => rateChanged(1)}
        >
          <img src={IconRating1} alt="1" />
        </button>
        <button
          className={`item ${selected === 2 && "active"}`}
          onClick={() => rateChanged(2)}
        >
          <img src={IconRating2} alt="2" />
        </button>
        <button
          className={`item ${selected === 3 && "active"}`}
          onClick={() => rateChanged(3)}
        >
          <img src={IconRating3} alt="3" />
        </button>
        <button
          className={`item ${selected === 4 && "active"}`}
          onClick={() => rateChanged(4)}
        >
          <img src={IconRating4} alt="4" />
        </button>
        <button
          className={`item ${selected === 5 && "active"}`}
          onClick={() => rateChanged(5)}
        >
          <img src={IconRating5} alt="5" />
        </button>
      </div>
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
};
export default Question;
