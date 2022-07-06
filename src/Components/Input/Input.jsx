import './Input.scss'
const Input =({type,value,handleChange,placeHolder,hasVal,isValid, name, handleFocus, autoFocus})=>{
    return (
        <div className="Input">          
            <input
                type={type}
                value={value}
                onChange={handleChange}
                className={hasVal?'Input__input  has-val':'Input__input'}
                name={name}
                onFocus={handleFocus}
                autoFocus={autoFocus}
            />
            <span className="Input__label" data-placeholder={placeHolder}></span>

        </div>
    )
}
export default Input