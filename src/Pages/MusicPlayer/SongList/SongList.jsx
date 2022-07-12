import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Song from "./Song";
import axios from "axios";

const SongList = () => {
  const [listSong, setListSong] = useState([]);
  const location = useLocation();
  const currentSong = !!location.state ? location.state.obj : "";

  useEffect(() => {
    const listApi =
      "https://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1";
    axios.get(listApi).then((response) => {
      setListSong(response.data.data.song);
    });
  }, []);
  return (
    <div className="Song__list">
      {listSong.map((song) => {
        return (
          <Song
            songId={song.id}
            songList={listSong}
            songPosition={song.position}
            playing={currentSong.songName === song.name ? true : false}
            songThumbnail={song.thumbnail}
            songCode={song.code}
            key={song.id}
            songDuration={song.duration}
            songName={song.name}
            songPerformer={song.performer}
          />
        );
      })}
    </div>
  );
};

export default SongList;
