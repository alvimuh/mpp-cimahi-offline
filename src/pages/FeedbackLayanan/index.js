import React, { useState } from "react";
import PropTypes from "prop-types";
import StepIndicator from "../../components/StepIndicator";
import Question from "./question";
import axios from "axios";

function FeedbackLayanan() {
  const questions = [
    "Bagaimana Kebersihan di lingkungan MPP?",
    "Bagaimana Kebersihan Toilet MPP?",
    "Bagaimana Keramahan Staff?",
  ];

  const [data, setData] = useState({
    number: 0,
    loading: false,
    selected: null,
  });

  const rateHandler = async () => {
    try {
      setData((prev) => ({
        ...prev,
        loading: true,
      }));
      await axios.post(`${process.env.REACT_APP_API_URL}/internal/rating`, {
        key: process.env.REACT_APP_API_KEY,
        nilai: data.selected,
        kategori: data.number + 1,
      });
      setData((prev) => ({
        number: prev.number + 1,
        loading: false,
        selected: null,
      }));
    } catch (error) {}
  };

  return (
    <main>
      <div className="container">
        <div className="wrapper">
          <div className="content">
            <h1 className="title">Feedback Layanan</h1>
            {data.number > 2 ? (
              <h2
                className="question"
                style={{
                  margin: "80px 0",
                }}
              >
                Feedback Anda telah tersimpan. Terima kasih!
              </h2>
            ) : (
              <Question
                question={questions[data.number]}
                rateChanged={(value) =>
                  setData((prev) => ({
                    ...prev,
                    selected: value,
                  }))
                }
                selected={data.selected}
                loading={data.loading}
              />
            )}
            {data.number > 2 ? (
              <button
                className="cta"
                onClick={() => {
                  setData({
                    number: 0,
                    loading: false,
                    selected: null,
                  });
                }}
              >
                Selesai
              </button>
            ) : (
              <button
                className="cta"
                disabled={data.loading || data.selected === null}
                onClick={() => {
                  rateHandler();
                }}
              >
                {data.loading ? "Harap Tunggu" : "Selanjutnya"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

FeedbackLayanan.propTypes = {};
export default FeedbackLayanan;
