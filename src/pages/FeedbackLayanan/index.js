import React, { useState } from "react";
import PropTypes from "prop-types";
import iconChecked from "../../assets/icons/icons8-checked-96.png";
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
    phone: "",
    loading: false,
    selected: null,
    cta: false,
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
        kategori: data.number,
        phone: data.phone,
      });
      setData((prev) => ({
        ...prev,
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
            {data.number === 0 ? (
              <div className="done">
                <div className="form-group">
                  <label>Nomor Telepon</label>
                  <input
                    style={{ marginTop: "12px" }}
                    type="number"
                    name="phone"
                    placeholder="Masukan Nomor Telepon"
                    value={data.phone}
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                        cta: true,
                      }));
                    }}
                  />
                </div>
              </div>
            ) : data.number > 3 ? (
              <div className="done">
                <img src={iconChecked} alt="checked" />
                <h2>Feedback Anda telah tersimpan. Terima kasih!</h2>
              </div>
            ) : (
              <Question
                question={questions[data.number - 1]}
                rateChanged={(value) =>
                  setData((prev) => ({
                    ...prev,
                    selected: value,
                    cta: true,
                  }))
                }
                selected={data.selected}
                loading={data.loading}
              />
            )}
            {data.number > 3 ? (
              <button
                className="cta"
                onClick={() => {
                  setData((prev) => ({
                    ...prev,
                    number: 0,
                    loading: false,
                    selected: null,
                    phone: "",
                  }));
                }}
              >
                Selesai
              </button>
            ) : (
              <button
                className="cta"
                disabled={data.loading || !data.cta}
                onClick={() => {
                  if (data.number === 0) {
                    setData((prev) => ({
                      ...prev,
                      number: 1,
                      cta: false,
                    }));
                  } else {
                    rateHandler();
                  }
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
