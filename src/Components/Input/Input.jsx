import './Input.scss'
const Input =({type,value,handleChange,placeHolder,hasVal,step, min, max, name, handleFocus, autoFocus,style })=>{
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
                step={step}
                min={min}
                max={max}
                style={style}
            />
            <span className="Input__label" data-placeholder={placeHolder}/>

        </div>
    )
}
export default Input