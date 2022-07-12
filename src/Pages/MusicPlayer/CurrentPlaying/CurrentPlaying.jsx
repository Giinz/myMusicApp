import Image from "../../../Components/Image/Image";
import Button from "../../../Components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import NavBar from "../Navbar/Navbar";
import axios from "axios";

const CurrentPlaying = () => {
  const [progressPercent, setProgressPercent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  console.log(isShuffle)
  const { state } = useLocation();
  const { obj } = state;
  const audioRef = useRef();
  const navigate = useNavigate();

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      const currentProgressPercent = Math.floor(
        (audio.currentTime / audio.duration) * 100
      );
      setProgressPercent(currentProgressPercent);
      if (audio.currentTime >= audio.duration && isRepeat ==false) handleNextSong();
      if (audio.currentTime >= audio.duration && isRepeat ==true) setProgressPercent(0);

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
  const handleNextSong = async () => {
    const nextSong = obj.songList.find(
      (song) => isShuffle? song.position == Math.floor(Math.random()*100+1) :song.position == obj.songPosition + 1
    );
    const nextSongSource = await (
      await axios.get(
        `https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${nextSong.code}`
      )
    ).data.data.source["128"];
    const nextSongData = {
      songName: nextSong.name,
      songCode: nextSong.code,
      songPerformer: nextSong.performer,
      songThumbnail: nextSong.thumbnail,
      songSource: nextSongSource,
      songPosition: nextSong.position,
      songList: obj.songList,
      songId: nextSong.id,
    };
    navigate(`../${nextSong.id}`, { state: { obj: nextSongData } });
  };
  const handlePrevSong = async () => {
    const prevSong = obj.songList.find(
      (song) => isShuffle? song.position == Math.floor(Math.random()*100+1) :song.position == obj.songPosition - 1

    );
    const prevSongSource = await (
      await axios.get(
        `https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${prevSong.code}`
      )
    ).data.data.source["128"];

    const prevSongData = {
      songName: prevSong.name,
      songCode: prevSong.code,
      songPerformer: prevSong.performer,
      songThumbnail: prevSong.thumbnail,
      songSource: prevSongSource,
      songPosition: prevSong.position,
      songList: obj.songList,
      songId: prevSong.id,
    };

    navigate(`../${prevSong.id}`, { state: { obj: prevSongData } });
  };
  const handeRepeatBtn = () => {
    setIsRepeat(!isRepeat)
  };
  const handleShuffleBtn = () => {
    setIsShuffle(!isShuffle)
  }

  useEffect(() => {
    setIsPlaying(true);
  }, [state]);
  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  });

  return (
    <div className="MusicPlaying">
      <div className="MusicPage__currentSong">
        <Image imgSrc={obj.songThumbnail} />
        <div className="currentSong__title">
          <h1>{obj.songName}</h1>
          <p>{obj.songPerformer}</p>
        </div>
        <Button
          handleClick={handlePlayBtn}
          value={isPlaying ? "Pause" : "Play"}
          icon={isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play"}
        />
        <audio
          onTimeUpdate={onTimeUpdate}
          src={obj.songSource}
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
};

export default CurrentPlaying;
