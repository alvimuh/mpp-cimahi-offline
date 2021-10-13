import React, { useCallback, useEffect, useState } from "react";
import "./Style.css";
import Cam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function Webcam(props) {
  const webcamRef = React.useRef(null);
  const [buffer, setBuffer] = useState(null);
  useEffect(() => {
    props.onChange(buffer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buffer]);

  const capture = useCallback(() => {
    const temp = webcamRef.current.getScreenshot();
    setBuffer(temp);
  }, [webcamRef]);
  if (buffer !== null) {
    return (
      <div className="webcam">
        <img src={buffer} alt="Captured" />
        <button
          type="button"
          onClick={() => {
            setBuffer(null);
          }}
        >
          Ulangi
        </button>
      </div>
    );
  }
  return (
    <div className="webcam">
      <Cam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        height={300}
        videoConstraints={videoConstraints}
      />
      <button type="button" onClick={capture}>
        Ambil Foto
      </button>
    </div>
  );
}
export default Webcam;
