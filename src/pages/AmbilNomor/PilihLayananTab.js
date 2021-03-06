import React, { useState, useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { groupByN } from "../../utility";
import { useAntrian } from "./context";
import DataNotFound from "../../components/DataNotFound/index";

function PilihLayananTab(props) {
  const { state, dispatch } = useAntrian();

  const fetchLayanan = async () => {
    dispatch({
      type: "LOADING",
    });
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/layanan/${state.instansiSelected}`
    );
    dispatch({
      type: "SET_LAYANAN",
      layanan: res.data.sub_layanan,
    });
  };

  const fetchInstansi = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/internal/kuota/offline`,
        {
          params: {
            key: process.env.REACT_APP_API_KEY,
          },
        }
      );
      dispatch({
        type: "SET_INSTANSI",
        instansi: res.data,
      });
    } catch (error) {}
  };
  useEffect(() => {
    fetchInstansi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [search, setSearch] = useState({
    target: "",
    keyword: "",
  });
  const onSearch = (e) => {
    if (e.target.name == "nama_layanan" && state.instansiSelected !== null)
      dispatch({
        type: "SWITCH_INSTANSI",
        id: null,
      });
    else if ("nama_sub_layanan" && state.layananSelected !== null)
      dispatch({
        type: "SWITCH_LAYANAN",
        id: null,
      });
    setSearch({
      target: e.target.name,
      keyword: e.target.value,
    });
  };
  const filterSearch = (data, type) => {
    if (type == search.target) {
      if (search.keyword === "") {
        return data;
      }

      return data.filter((item) => {
        return item[type].toLowerCase().includes(search.keyword.toLowerCase());
      });
    } else {
      return data;
    }
  };

  const layananItems = groupByN(
    8,
    filterSearch(state.instansi, "nama_layanan")
  );
  const subLayananItems = groupByN(
    8,
    filterSearch(state.layanan, "nama_sub_layanan")
  );

  return (
    <div>
      {state.loading ? (
        <div>
          <ul className="select">
            {[...Array(8)].map(() => (
              <li>
                <Skeleton height={160} />
              </li>
            ))}
          </ul>
        </div>
      ) : state.step === 0 ? (
        <>
          <div className="form-group">
            <input
              type="text"
              name="nama_layanan"
              placeholder="Cari tenant"
              value={search.keyword}
              onChange={onSearch}
            />
          </div>
          {layananItems.length > 0 ? (
            <Carousel plugins={["arrows"]}>
              {layananItems.map((group, indexGroup) => (
                <ul className="select" key={indexGroup}>
                  {group.map((item, indexItem) => {
                    let classess = ["item"];
                    if (state.instansiSelected === item.id) {
                      classess.push("active");
                    }
                    if (item.kuota < 1) {
                      classess.push("disabled");
                    }
                    return (
                      <li
                        key={indexItem}
                        onClick={() => {
                          if (item.kuota > 0) {
                            dispatch({
                              type: "SWITCH_INSTANSI",
                              id: item.id,
                            });
                          }
                        }}
                        className={classess.join(" ")}
                      >
                        <img
                          src={item.gambar_layanan_url}
                          alt={"Logo " + item.nama_layanan}
                        />
                        <h3>{item.nama_layanan}</h3>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </Carousel>
          ) : (
            <DataNotFound title="Tenant" />
          )}
        </>
      ) : (
        <>
          <div className="form-group">
            <input
              type="text"
              name="nama_sub_layanan"
              placeholder="Cari layanan"
              value={search.keyword}
              onChange={onSearch}
            />
          </div>
          {subLayananItems.length > 0 ? (
            <Carousel plugins={["arrows"]}>
              {subLayananItems.map((group, indexGroup) => (
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
                        state.layananSelected === item.id && "active"
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
          ) : (
            <DataNotFound title="Layanan" />
          )}
        </>
      )}
      <button
        className="cta"
        disabled={state.ctaDisabled || props.loading}
        onClick={() => {
          setSearch({
            target: "",
            keyword: "",
          });
          if (state.step === 0) {
            fetchLayanan();
          } else {
            dispatch({
              type: "SWITCH_STEP",
              to: 2,
            });
          }
        }}
      >
        {state.loading
          ? "Harap tunggu"
          : state.step === 0
          ? "Pilih Instansi"
          : "Pilih Layanan"}
      </button>
    </div>
  );
}

PilihLayananTab.propTypes = {};
export default PilihLayananTab;
