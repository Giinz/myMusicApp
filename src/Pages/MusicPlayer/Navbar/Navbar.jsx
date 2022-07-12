import ControlButton from "../../../Components/ControlButton/ControlButton";
import Input from "../../../Components/Input/Input";

const Navbar = ({
  isPlaying,
  progressChange,
  handleShuffle,
  handlePrev,
  handlePlay,
  handleNext,
  handleRepeat,
  progressValue,
  style,
  isRepeat,
  isShuffle
}) => {
  return (
    <div className="Song__control">
      <div className="control">
        <ControlButton
          iconClassName={isShuffle?"fa-solid fa-shuffle active":"fa-solid fa-shuffle"}
          buttonName="shuffleBtn"
          handleClick={handleShuffle}
        />
        <ControlButton
          iconClassName="fa-solid fa-backward-step"
          buttonName="prevBtn"
          handleClick={handlePrev}
        />
        <ControlButton
          iconClassName={isPlaying ? "fa-solid fa-pause active" : "fa-solid fa-play"}
          buttonName="playBtn"
          handleClick={handlePlay}
        />
        <ControlButton
          iconClassName="fa-solid fa-forward-step"
          buttonName="nextBtn"
          handleClick={handleNext}
        />
        <ControlButton
          iconClassName={isRepeat? "fa-solid fa-rotate-left active" : "fa-solid fa-rotate-left"}
          buttonName="repeatBtn"
          handleClick={handleRepeat}
        />
      </div>
      <div className="progress">
        <Input type="range" value={progressValue} handleChange={progressChange} style={style}  step='1' min='0' max='100'/>
      </div>
    </div>
  );
};

export default Navbar;
