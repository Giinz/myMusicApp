import './Button.scss'

const Button =({value, handleClick, type, disable})=>{
return (
    <div className='Button'>
        <button  className="Button__btn" onClick={handleClick} type={type} disabled={disable}>{value}</button>
    </div>
    )
}

export default Button