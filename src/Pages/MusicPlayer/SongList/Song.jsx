import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Song = ({ songCode }) => {
  const songApi = `https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${songCode}`;
  const [songDetail, setSongDetail] = useState('')
  const param = useParams();
  const playing = param.songCode == songCode;
  const navigate = useNavigate();
  const convertDuration = (duration) => {
    const seconds = duration % 60;
    const remainingSeconds = seconds < 10 ? "0" + seconds : seconds;
    return (
      Math.floor(duration / 60) +
      ":" +
      (remainingSeconds ? remainingSeconds : "00")
    );
  };
  const handleClick = (obj) => {
    navigate(`${songCode}`);
  };
useEffect(() => {
    const getSource = async () => {
      const audioSource = await axios.get(songApi);
      setSongDetail(audioSource.data.data);
    };
    getSource();
  }, []);
  return (
    <div className={playing ? "List__item selected" : "List__item"}>
      <div className="Song__icon">
        <div className={playing ? "icon disable" : "icon"}>
          <i className="fa-solid fa-music"></i>
        </div>
        <div className={playing ? "playBtn disable" : "playBtn"}>
          <i
            className="fa-solid fa-play"
            onClick={handleClick}
          ></i>
        </div>
        <div className={playing ? "playingIcon playing" : "playingIcon"}>
          <i></i>
        </div>
      </div>
      <div className="Song__name">
        <p onClick={handleClick}>{songDetail.name} </p>
      </div>
      <div className="Song__artist">
        <p>{songDetail.performer}</p>
      </div>
      <div className="Song__duration">
        <p>{convertDuration(songDetail.duration)}</p>
      </div>
    </div>
  );
};
export default Song;
