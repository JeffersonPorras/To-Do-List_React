import './AllList.css';
import { FaClipboardCheck } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";

function List({tasks, onDelete, onComplete}) {
    if (tasks.length === 0) {
        return <p className="empty-msg">No hay tareas en esta sección.</p>
    }

    return(
        <ul className='All-list'> 
        {tasks.map((task) =>(
            <li key={task.id} className='All-item'>
                {!task.completed && (
                    <button className="check-list" onClick={() => onComplete && onComplete(task.id)}>
                    <FaClipboardCheck />
                </button>
                )}
                <div className="task-content">
                    <span className={task.completed ? "text-completed" : ""}>
                    {task.text}
                </span>
                    {task.completed && (
                        <small className="complete-date"> - Realizado el: {task.completedAt}</small>
                    )}
                </div>
                <button className="delete-btn" onClick={() => onDelete(task.id)}>
                    <BsFillTrash3Fill />
                </button>
            </li>
        ))}
        </ul>
    )
}
export default List;