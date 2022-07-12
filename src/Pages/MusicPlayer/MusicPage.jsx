import "./MusicPage.scss";
import SongList from "./SongList/SongList";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const ListSongContext = createContext();
const MusicPage = () => {
  const [listSong, setListSong] = useState([]);
  useEffect(() => {
    const listApi =
      "https://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1";
    axios.get(listApi).then((response) => {
      setListSong(response.data.data.song);
    });
  }, []);

  return (
    <ListSongContext.Provider value={listSong}>
      <div className="MusicPage">
        <div className="MusicPage__container">
          <Outlet />
          <div className="MusicPage__listSong">
            <h2>Song's library</h2>
            <SongList />
          </div>
        </div>
      </div>
    </ListSongContext.Provider>
  );
};

export default MusicPage;
