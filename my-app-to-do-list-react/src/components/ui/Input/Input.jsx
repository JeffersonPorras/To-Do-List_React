import './input.css'
import { useState } from 'react';

function Input({children, placeholder}) {

    const [task, setTask] = useState('')

    const handleInputChange = (event) =>{
        setTask(event.target.value);
    }
    return(
        <div className="input-task-container">
        <h2>Current Task:</h2>
        <p>{task}</p>

        <input 
        type="text" 
        className='input-field'
        placeholder={placeholder || "write your task"}
        value={task}
        onChange={handleInputChange}
        />
        {children}
    </div>
    
    );
    
}
export default Input;