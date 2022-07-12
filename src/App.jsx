import './App.scss';
import Homepage from './Pages/Homepage/Homepage';
import MusicPage from './Pages/MusicPlayer/MusicPage';
import { Routes, Route } from 'react-router-dom';
import CurrentPlaying from './Pages/MusicPlayer/CurrentPlaying/CurrentPlaying';
import IndexSong from './Pages/MusicPlayer/IndexSong/IndexSong';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='music' element={<MusicPage />} >
          <Route index element={<IndexSong/>}/>
          <Route path={`/music/:songCode`} element={<CurrentPlaying/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
