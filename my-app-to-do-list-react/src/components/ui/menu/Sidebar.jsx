import './Sidebar.css'

function Sidebar({isOpen, toggleMenu}) {
    return(
        <>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={toggleMenu}>&times;</button>
            <nav>
                <ul>
                    <li><a href="#profile" className="a-item">Mi Perfil</a></li>
                    <li><a href="#profile" className="a-item">Configuración</a></li>
                    <li><a href="#profile" className="a-item">Estadísticas</a></li>
                </ul>
            </nav>
        </div>

        {isOpen && <div className="overlay" onClick={toggleMenu}></div> }
        </>
    )
}
export default Sidebar;    