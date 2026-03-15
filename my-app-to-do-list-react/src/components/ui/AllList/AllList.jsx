import './AllList.css';

function List({tasks}) {
    if (tasks.length === 0) {
        return <p>No hay tareas Pendientes.</p>
    }

    return(
        <ul className='All-list'> 
        {tasks.map((task,index) =>(
            <li key={index} className='All-item'>
                {task}
            </li>
        ))}
        </ul>
    )
}
export default List;