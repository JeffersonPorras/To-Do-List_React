import './Button.css';


function Button({ children, onClick, color = "blue" }) {
    return (
        <button
            className={`custom-button ${color}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
export default Button;
