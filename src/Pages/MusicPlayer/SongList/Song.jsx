import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect,useState } from "react";

const Song = ({
  songName,
  songDuration,
  songPerformer,
  songCode,
  songThumbnail,
  playing,
  songPosition,
  songList,
  songId
}) => {
  const songApi = `https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${songCode}`
  const [songSource, setSongSource] = useState('');
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
  const songInfo = { songName, songCode, songPerformer, songThumbnail,songSource, songPosition, songList, songId };
  const handleClick = (obj) => {
    navigate(`${obj.songId}`, {state:{obj}});
  };

  useEffect(() => {
    const getSource = async()=>{
      const audioSource=await axios.get(songApi)
      setSongSource(audioSource.data.data.source['128'])
    }
    getSource()
    },[])
  return (
    <div  className={playing?"List__item selected":"List__item"}>
      <div className="Song__icon">
        <div className={playing?'icon disable':'icon'}>
          <i className="fa-solid fa-music"></i>
        </div>
        <div className={playing?'playBtn disable':'playBtn'}>
          <i className="fa-solid fa-play" onClick={()=>handleClick(songInfo)}></i>
        </div>
        <div className={playing?"playingIcon playing":"playingIcon"}>
          <i></i>
        </div>
      </div>
      <div className="Song__name">
        <p onClick={()=>handleClick(songInfo)}>{songName} </p>
      </div>
      <div className="Song__artist">
        <p>{songPerformer}</p>
      </div>
      <div className="Song__duration">
        <p>{convertDuration(songDuration)}</p>
      </div>
    </div>
  );
};
export default Song;
