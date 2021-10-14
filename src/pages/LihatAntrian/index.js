import React, { useState, useEffect } from "react";
import { queuePad } from "../../utility";
import "./style.css";
import axios from 'axios';
import Pusher from 'pusher-js';

function LihatAntrian() {
  const [data, setData] = useState([]);
  const [calling, setCalling] = useState(false);
  const playing = async (url) => {
    await new Promise((resolve) => {
      const audio = new Audio(url);
      audio.onended = resolve;
      audio.play();
    });
  };
  const spell = async (num) => {
    if (num.length === 1) {
      await playing(process.env.PUBLIC_URL + "/sound/" + num[0] + ".wav");
    } else {
      // if (num.length === 3) {
      //   if (num[0] === "1") {
      //     await playing(process.env.PUBLIC_URL + "/sound/seratus.wav");
      //   } else {
      //     await playing(process.env.PUBLIC_URL + "/sound/" + num[0] + ".wav");
      //     await playing(process.env.PUBLIC_URL + "/sound/ratus.wav");
      //   }
      // }
      if (num[0] === "1" && num[1] === "0") {
        await playing(process.env.PUBLIC_URL + "/sound/sepuluh.wav");
      } else if (num[0] === "1" && num[1] === "1") {
        await playing(process.env.PUBLIC_URL + "/sound/sebelas.wav");
      } else if (num[0] === "1") {
        await playing(process.env.PUBLIC_URL + "/sound/" + num[1] + ".wav");
        await playing(process.env.PUBLIC_URL + "/sound/belas.wav");
      } else {
        await playing(process.env.PUBLIC_URL + "/sound/" + num[0] + ".wav");
        await playing(process.env.PUBLIC_URL + "/sound/puluh.wav");
        await playing(process.env.PUBLIC_URL + "/sound/" + num[1] + ".wav");
      }
    }
  };
  const newAntrianHandler = async (data) => {
    setCalling(data);
    await playing(process.env.PUBLIC_URL + "/sound/nomor-urut.wav");
    await spell(data.urutan + "");
    await playing(process.env.PUBLIC_URL + "/sound/loket.wav");
    await spell(data.loket + "");
    setCalling(null);
  };

  const getAntrian = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/antrian-display`)
      const list = [
        {
          name: "",
          urutan: "",
          loket: "1",
        },
        {
          name: "",
          urutan: "",
          loket: "3",
        },
        {
          name: "",
          urutan: "",
          loket: "2",
        },
        {
          name: "",
          urutan: "",
          loket: "4",
        },
        {
          name: "",
          urutan: "",
          loket: "5",
        },
        {
          name: "",
          urutan: "",
          loket: "6",
        },
        {
          urutan: "",
          name: "",
          loket: "7",
        },
        {
          urutan: "",
          name: "",
          loket: "8",
        },
      ]
      const dataApi = result.data;

        list.map(el => {
        for (let i=0; i<dataApi.length; i++) {

            if (el.loket === dataApi[i].no_loket) {
              el.urutan = dataApi[i].urutan
              el.name = dataApi[i].name
             }
            }
        });

        setData(list.sort((a,b) => (a.loket > b.loket) ? 1 : ((b.loket > a.loket) ? -1 : 0)))
    } catch (err) {
      console.log("error : ", err);
    }
  }

  useEffect(() => {
    getAntrian();
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER
    })

    const channel = pusher.subscribe('panggiAntrian');
    channel.bind('panggil_antrian', (antrianData) => {
      data.map((el) => {
        if (el.loket == antrianData.no_loket) {
          el.name = antrianData.name
          el.urutan = antrianData.urutan
        }
      })
      newAntrianHandler({
            name: antrianData.name,
            nik: antrianData.nik,
            urutan:  antrianData.urutan,
            loket:  antrianData.no_loket,
            avatar_url: antrianData.avatar
      })

      setData(data.sort((a,b) => (a.loket > b.loket) ? 1 : ((b.loket > a.loket) ? -1 : 0))
    })

  }, [])

  if (calling) {
    return (
      <main id="calling">
        <div className="left">
          <h1>Nomor Antrian:</h1>
          <p className="number">{queuePad(calling.urutan)}</p>
          <p className="locket">LOKET {calling.loket}</p>
        </div>
        <div className="right">
          <div className="box">
            <img src={calling.avatar_url} alt="foto" />
            <h1>{calling.name}</h1>
            <p>NIK:{calling.nik}</p>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main>
      <button
        style={{
          position: "absolute",
          bottom: 25,
          left: 25,
        }}
        onClick={() => {
          newAntrianHandler({
            id: 1,
            name: "Alvira",
            nik: "10517094",
            avatar: "1634167153_foto_Alvira.jpg",
            status_terlayani: "BELUM_TERLAYANI",
            urutan: 1,
            sub_layanan_id: 1,
            loket: 1,
            created_at: "2021-10-13T23:19:13.000000Z",
            updated_at: "2021-10-13T23:19:13.000000Z",
            avatar_url:
              "http://localhost:8000/visitor_photos/1634167153_foto_Alvira.jpg",
          });
        }}
      >
        Simulasi
      </button>
      <div className="grid">
        {data.map((item) => (
          <div className="item">
            <h3>{item.urutan}</h3>
            <p className="name">{item.name}</p>
            <p className="locket">LOKET {item.loket}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

LihatAntrian.propTypes = {};
export default LihatAntrian;
