import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import identity from "../../assets/icons/icons8-identity-theft-96.png";
import select from "../../assets/icons/icons8-check-all-96.png";
import waiting from "../../assets/icons/icons8-time-card-96.png";
import { Switch, Link, Route, useRouteMatch } from "react-router-dom";
import axios from "axios";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { groupByN } from "../../utility";

function PilihLayananTab(props) {
  const [instansiSelected, setInstansiSelected] = useState(null);
  const [layananSelected, setLayananSelected] = useState(null);
  const [layanan, setLayanan] = useState([]);
  const fetchLayanan = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/layanan/${instansiSelected}`
    );
    setLayanan(res.data);
  };
  useEffect(() => {
    fetchLayanan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instansiSelected]);

  if (props.loading) {
    return <div>Loading</div>;
  }
  const selectHandler = (type, id) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case "instansi":
        if (instansiSelected !== id) {
          setInstansiSelected(id);
        } else {
          setInstansiSelected(null);
        }
        break;
      case "layanan":
        setLayananSelected(id);
        break;
    }
  };
  return (
    <div>
      <Carousel plugins={["arrows"]}>
        {groupByN(8, props.instansi).map((group, indexGroup) => (
          <ul className="select" key="indexGroup">
            {group.map((item, indexItem) => (
              <li
                key={indexItem}
                onClick={() => selectHandler("instansi", item.id)}
                className={`item ${instansiSelected === item.id && "active"}`}
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
      <button className="cta" disabled={instansiSelected === null}>
        Pilih Instansi
      </button>
    </div>
  );
}
function IsiIdentitasTab() {
  return (
    <form onSubmit="" autoComplete="off">
      <div className="form-group">
        <label>Nomor Induk Kependudukan</label>
        <input name="nik" />
      </div>
      <div className="form-group">
        <label>Nama Lengkap</label>
        <input name="nama" />
      </div>
      <button>Lanjutkan</button>
    </form>
  );
}
function AmbilNomor() {
  let match = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [instansi, setInstansi] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/dasbor`);
      setInstansi(res.data.layanan);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main>
      <div className="container">
        <h1>Ambil Nomor Antrian</h1>
        <ul className="steps-line">
          <li>
            <Link to={match.url + "/langkah-1"}>
              <img src={select} alt="Pilih Layanan" />
              <span>1</span>
            </Link>
          </li>
          <li>
            <Link to={match.url + "/langkah-2"}>
              <img src={identity} alt="Isi Identitas" />
              <span>2</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <img src={waiting} alt="Ambil Nomor Antrian" />
              <span>3</span>
            </Link>
          </li>
        </ul>
        <div className="wrapper">
          <Switch>
            <Route path={match.path + "/langkah-1"}>
              <PilihLayananTab loading={loading} instansi={instansi} />
            </Route>
            <Route path={match.path + "/langkah-2"}>
              <IsiIdentitasTab />
            </Route>
          </Switch>
        </div>
      </div>
    </main>
  );
}

AmbilNomor.propTypes = {};
export default AmbilNomor;
