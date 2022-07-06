import './VideoBackground.scss';

const VideosBackground = ({videoBg}) => {
    return (
        <div>
            <video  autoPlay muted loop id="myVideo">
                <source src={videoBg} type="video/webm"/>
            </video>
        </div>
    )
}

export default VideosBackground