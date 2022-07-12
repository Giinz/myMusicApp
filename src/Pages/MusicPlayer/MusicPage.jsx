import "./MusicPage.scss";
import SongList from "./SongList/SongList";
import { Outlet } from "react-router-dom";

const MusicPage = () => {
  return (
    <div className="MusicPage">
      <div className="MusicPage__container">
        <Outlet />
        <div className="MusicPage__listSong">
          <h2>Song's library</h2>
          <SongList />
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
