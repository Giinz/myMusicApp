import { useContext } from "react";
import Song from "./Song";
import { ListSongContext } from "../MusicPage";

const SongList = () => {
  const listSong = useContext(ListSongContext)
  
  return (
      <div className="Song__list">
        {listSong.map((song) => {
          return <Song songCode={song.code} key={song.id}  />;
        })}
      </div>
  );
};

export default SongList;
