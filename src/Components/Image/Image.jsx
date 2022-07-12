import './Image.scss'

const Image = ({imgSrc}) => {
    return (
        <div className='Image'>
            <img src={imgSrc} alt="" />
        </div>
    )
}

export default Image