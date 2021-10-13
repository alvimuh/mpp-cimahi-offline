import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { groupByN } from "../../utility";
import { useHistory } from "react-router-dom";
import { AntrianContext, useAntrian } from "./context";

function PilihLayananTab(props) {
  const { state: antrianState, dispatch } = useAntrian();
  const history = useHistory();

  const [toNextStep, setToNextStep] = useState(false);

  const fetchLayanan = async () => {
    dispatch({
      type: "LOADING",
    });
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/layanan/${antrianState.instansiSelected}`
    );
    dispatch({
      type: "SET_LAYANAN",
      layanan: res.data.sub_layanan,
    });
  };

  const fetchInstansi = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/dasbor`);
      dispatch({
        type: "SET_INSTANSI",
        instansi: res.data.layanan,
      });
    } catch (error) {}
  };
  useEffect(() => {
    fetchInstansi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {antrianState.loading ? (
        <div>
          <ul className="select">
            {[...Array(8)].map(() => (
              <li>
                <Skeleton height={160} />
              </li>
            ))}
          </ul>
        </div>
      ) : antrianState.step === 0 ? (
        <Carousel plugins={["arrows"]}>
          {groupByN(8, antrianState.instansi).map((group, indexGroup) => (
            <ul className="select" key={indexGroup}>
              {group.map((item, indexItem) => (
                <li
                  key={indexItem}
                  onClick={() =>
                    dispatch({
                      type: "SWITCH_INSTANSI",
                      id: item.id,
                    })
                  }
                  className={`item ${
                    antrianState.instansiSelected === item.id && "active"
                  }`}
                >
                  <img
                    src={item.gambar_layanan_url}
                    alt={"Logo " + item.nama_layanan}
                  />
                  <h3>{item.nama_layanan}</h3>
                </li>
              ))}
            </ul>
          ))}
        </Carousel>
      ) : (
        <Carousel plugins={["arrows"]}>
          {groupByN(8, antrianState.layanan).map((group, indexGroup) => (
            <ul className="select" key={indexGroup}>
              {group.map((item, indexItem) => (
                <li
                  key={indexItem}
                  onClick={() =>
                    dispatch({
                      type: "SWITCH_LAYANAN",
                      id: item.id,
                    })
                  }
                  className={`item ${
                    antrianState.layananSelected === item.id && "active"
                  }`}
                >
                  <img
                    src={item.gambar_sub_layanan_url}
                    alt={"Logo " + item.nama_sub_layanan}
                  />
                  <h3>{item.nama_sub_layanan}</h3>
                </li>
              ))}
            </ul>
          ))}
        </Carousel>
      )}
      <button
        className="cta"
        disabled={antrianState.ctaDisabled || props.loading}
        onClick={() => {
          if (antrianState.step === 0) {
            fetchLayanan();
          } else {
            dispatch({
              type: "SWITCH_STEP",
              to: 3,
            });
            history.push("/ambil-nomor/langkah-2");
          }
        }}
      >
        {antrianState.loading
          ? "Harap tunggu"
          : antrianState.step === 0
          ? "Pilih Instansi"
          : "Pilih Layanan"}
      </button>
    </div>
  );
}

PilihLayananTab.propTypes = {};
export default PilihLayananTab;
