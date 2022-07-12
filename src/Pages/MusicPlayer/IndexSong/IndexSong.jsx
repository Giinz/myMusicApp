import Image from "../../../Components/Image/Image";

const IndexSong = () => {
  return (
    <div className="MusicPage__currentSong">
      <Image imgSrc="https://i.pinimg.com/originals/0b/a8/df/0ba8dfceaa16c47b713cbed42c1e6b34.jpg" />
      <div className="currentSong__title">
        <h1 style={{ fontSize: "26px", padding: "10px" }}>
          Life is one grand, sweet song so start the music
        </h1>
        <p>Music is life itself.</p>
      </div>
    </div>
  );
};

export default IndexSong;
