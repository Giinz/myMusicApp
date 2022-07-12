import './Button.scss'

const Button =({value, handleClick, type, disable,icon})=>{
return (
    <div className='Button'>
        <button  className="Button__btn" onClick={handleClick} type={type} disabled={disable}>
            <i className={icon} style={{marginRight:'10px',color:'white'}}></i>
            {value}
            </button>
    </div>
    )
}

export default Button