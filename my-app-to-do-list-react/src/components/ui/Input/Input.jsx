import './input.css'

function Input({value, onChange, placeholder}) {
    return(
        <div className="input-task-container">
        <input 
        type="text" 
        className='input-field'
        placeholder={placeholder || "write your task"}
        value={value}
        onChange={onChange}
        />
    </div>
    
    );
    
}
export default Input;