import './Button.css';


function Button({ children, onclick, color = "blue" }) {
    return (
        <button
            className={`custom-button ${color}`}
            onClick={onclick}
        >
            {children}
        </button>
    );
}
export default Button;
