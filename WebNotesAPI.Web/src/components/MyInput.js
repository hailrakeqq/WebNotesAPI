import React, {useState} from "react";

function MyInput(props) {
    const [inputType] = useState(props.type)
    const [inputValue, setInputValue] = useState('')

    function handleChange(event){
        setInputValue(event.target.value);
        if(props.onChange) props.onChange(inputValue)
    }
    return (
        <>
            <input id={props.id} type={inputType} value={inputValue} name="input-form" onChange={handleChange} class="inputclass" placeholder={props.placeholder}/>
        </>
    );
}
export default MyInput;