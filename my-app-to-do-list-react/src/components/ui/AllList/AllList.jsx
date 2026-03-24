import './AllList.css';
import { FaClipboardCheck } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";

function List({tasks, onDelete}) {
    if (tasks.length === 0) {
        return <p>No hay tareas Pendientes.</p>
    }

    return(
        <ul className='All-list'> 
        {tasks.map((task,index) =>(
            <li key={index} className='All-item'>
                <button className="check-list">
                    <FaClipboardCheck />
                </button>
                <span>{task}</span>
                <button className="delete-btn" onClick={() => onDelete(index)}>
                    <BsFillTrash3Fill />
                </button>
            </li>
        ))}
        </ul>
    )
}
export default List;