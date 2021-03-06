import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import "./style.css";
import { useAntrian } from "./context";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import iconChecked from "../../assets/icons/icons8-checked-96.png";
import Skeleton from "react-loading-skeleton";

function IsiSurvei() {
  const { state, dispatch } = useAntrian();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/list-pertanyaan-survey`
      );
      setQuestions(res.data.data);
      setLoading(false);
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const submitData = async (value) => {
    try {
      const list_jawaban = [];
      for (let key in value) {
        list_jawaban.push({
          pertanyaan_id: key.split("-")[1],
          jawaban: value[key],
          pelayanan_id: state.booking.id,
        });
      }
      await axios.post(
        `${process.env.REACT_APP_API_URL}/send-survey`,
        list_jawaban
      );

      dispatch({
        type: "SWITCH_STEP",
        to: 3,
      });
    } catch (error) {
      // const handler = errorHandler(error);
      // toast.show({
      //   ...handler,
      //   placement: "top",
      // });
      setSubmitting(false);
    }
  };

  return (
    <div className="result">
      <form onSubmit={handleSubmit(submitData)}>
        {loading && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <Skeleton height={60} />
              <br />
              <Skeleton height={60} width={60} style={{ marginRight: 10 }} />
              <Skeleton height={60} width="40%" />
              <br />
              <Skeleton height={60} width={60} style={{ marginRight: 10 }} />
              <Skeleton height={60} width="40%" />
              <br />
              <Skeleton height={60} width={60} style={{ marginRight: 10 }} />
              <Skeleton height={60} width="40%" />
              <br />
              <Skeleton height={60} width={60} style={{ marginRight: 10 }} />
              <Skeleton height={60} width="40%" />
            </div>
          </div>
        )}
        {questions.map((item, index) => (
          <Controller
            control={control}
            name={"question-" + item.id}
            rules={{ required: item.is_required === "1" }}
            defaultValue={item.tipe_pertanyaan === "MULTIPLE_CHOICE" ? [] : ""}
            render={({ field: { onChange, onBlur, value } }) => (
              <div className="form-group">
                <h2>{item.pertanyaan}</h2>
                {item.tipe_pertanyaan === "ONE_CHOICE" ? (
                  item.list_jawaban.map((option, optionIndex) => (
                    <div>
                      <input
                        key={optionIndex}
                        id={`op-${index}-${optionIndex}`}
                        type="radio"
                        value={option}
                        onChange={onChange}
                        checked={value === option}
                      />
                      <label for={`op-${index}-${optionIndex}`}>{option}</label>
                    </div>
                  ))
                ) : item.tipe_pertanyaan === "MULTIPLE_CHOICE" ? (
                  item.list_jawaban.map((option, optionIndex) => (
                    <div>
                      <input
                        key={optionIndex}
                        id={`op-${index}-${optionIndex}`}
                        type="checkbox"
                        value={option}
                        onChange={(e) => {
                          if (e.target.checked) {
                            const prev = value;
                            prev.push(e.target.value);
                            onChange(prev);
                          } else {
                            const prev = value;
                            prev.splice(prev.indexOf(e.target.value), 1);
                            onChange(prev);
                          }
                        }}
                        // checked={value.includes(option)}
                      />
                      <label for={`op-${index}-${optionIndex}`}>{option}</label>
                    </div>
                  ))
                ) : item.tipe_pertanyaan === "LONG_ANSWER" ? (
                  <div>
                    <textarea
                      placeholder="Ketik jawaban..."
                      onChange={onChange}
                      onBlur={onBlur}
                    >
                      {value}
                    </textarea>
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      placeholder="Ketik jawaban..."
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </div>
                )}
              </div>
            )}
          />
        ))}
        <button type="submit" className="cta" disabled={submitting}>
          {submitting ? "Harap Tunggu" : "Kirim Jawaban"}
        </button>
      </form>
    </div>
  );
}

// IsiSurvei.propTypes = {};
export default IsiSurvei;
