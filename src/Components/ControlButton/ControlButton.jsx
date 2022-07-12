import './ControlButton.scss'

const ControlButton = ({iconClassName,buttonName,handleClick}) => {
    return (
        <div className="controlButton">
            <i className={iconClassName} name={buttonName} onClick={handleClick}></i>
        </div>
    )
}

export default ControlButton