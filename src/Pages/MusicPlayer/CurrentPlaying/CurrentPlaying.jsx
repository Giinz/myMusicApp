import Image from "../../../Components/Image/Image";
import Button from "../../../Components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import NavBar from "../Navbar/Navbar";
import axios from "axios";
import { ListSongContext } from "../MusicPage";

const CurrentPlaying = () => {
  const listSong = useContext(ListSongContext);
  const [songSource, setSongSource] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const param = useParams();
  const audioRef = useRef();
  const navigate = useNavigate();

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      const currentProgressPercent = Math.floor(
        (audio.currentTime / audio.duration) * 100
      );
      setProgressPercent(currentProgressPercent);
      if (audio.currentTime >= audio.duration && isRepeat == false)
        handleNextSong();
      if (audio.currentTime >= audio.duration && isRepeat == true)
        setProgressPercent(0);
    }
  };
  const progressChange = (e) => {
    const seekto = audioRef.current.duration * (+e.target.value / 100);
    audioRef.current.currentTime = seekto;
    setProgressPercent(e.target.value);
  };
  const getBackgroundSize = () => {
    return {
      backgroundSize: `${progressPercent}% 100%`,
    };
  };
  const handlePlayBtn = () => {
    const audio = audioRef.current;
    if (audio) {
      setProgressPercent(
        Math.floor((audio.currentTime / audio.duration) * 100)
      );
    }
    setIsPlaying(!isPlaying);
  };
  const handleNextSong = () => {
    const currentSong = listSong.find((song) => song.id == songSource.id);
    const nextSong = listSong.find((song) =>
      isShuffle
        ? song.position == Math.floor(Math.random() * 100 + 1)
        : song.position == currentSong.position + 1
    );
    navigate(`../${nextSong.code}`);
  };
  const handlePrevSong = () => {
    const currentSong = listSong.find((song) => song.id == songSource.id);
    const prevSong = listSong.find((song) =>
      isShuffle
        ? song.position == Math.floor(Math.random() * 100 + 1)
        : song.position == currentSong.position - 1
    );
    navigate(`../${prevSong.code}`);
  };
  const handeRepeatBtn = () => {
    setIsRepeat(!isRepeat);
  };
  const handleShuffleBtn = () => {
    setIsShuffle(!isShuffle);
  };

  useEffect(() => {
    const songApi = `https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${param.songCode}`;
    const getSource = async () => {
      const audioSource = await axios.get(songApi);
      setSongSource(audioSource.data.data);
    };
    getSource();
    setIsPlaying(true);
  }, [param]);
  useEffect(() => {
    if (!!songSource) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  });

  if (!!songSource) {
    return (
      <div className="MusicPlaying">
        <div className="MusicPage__currentSong">
          <Image imgSrc={songSource.thumbnail} />
          <div className="currentSong__title">
            <h1>{songSource.name}</h1>
            <p>{songSource.performer}</p>
          </div>
          <Button
            handleClick={handlePlayBtn}
            value={isPlaying ? "Pause" : "Play"}
            icon={isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play"}
          />
          <audio
            onTimeUpdate={onTimeUpdate}
            src={songSource.source["128"]}
            ref={audioRef}
            typeof="audio/mp3"
          ></audio>
        </div>
        <div className="MusicPage__progress">
          <NavBar
            isPlaying={isPlaying}
            progressValue={progressPercent || 0}
            progressChange={progressChange}
            handlePlay={handlePlayBtn}
            handleNext={handleNextSong}
            handlePrev={handlePrevSong}
            style={getBackgroundSize()}
            handleRepeat={handeRepeatBtn}
            isRepeat={isRepeat}
            isShuffle={isShuffle}
            handleShuffle={handleShuffleBtn}
          />
        </div>
      </div>
    );
  }
  return <>Loading....</>;
};

export default CurrentPlaying;
