import './Sidebar.css'

function Sidebar({isOpen, toggleMenu ,setView}) {
    return(
        <div className={`sidebar ${isOpen ? 'open' : ""}`}>

             <button className="close-btn" onClick={toggleMenu}>&times;</button>

            <nav className="sidebar-nav">
                <button className="sidebar-nav_button" onClick={() => {setView("dashboard"); toggleMenu();}}>🏠 Tareas Diarias</button>
                <button className="sidebar-nav_button" onClick={() => {setView("future"); toggleMenu();}}>🚀 Agenda a Futuro</button>
                <button className="sidebar-nav_button" onClick={() => {setView("history"); toggleMenu();}}>✅ Historial</button>
            </nav>
            {isOpen && <div className="overlay" onClick={toggleMenu}></div> }
        </div>
    )
}
export default Sidebar;    