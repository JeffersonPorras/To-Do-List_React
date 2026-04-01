import './Button.css';


function Button({ children, onClick, color = "blue", disabled }) {
    return (
        <button
            className={`custom-button ${color}`}
            onClick={onClick}
            disabled = {disabled}
        >
            {children}
        </button>
    );
}
export default Button;
