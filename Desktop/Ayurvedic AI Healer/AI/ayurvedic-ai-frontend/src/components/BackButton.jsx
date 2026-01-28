import { useNavigate } from "react-router-dom";
import "../styles/commonUI.css";

function BackButton({ to }) {
  const navigate = useNavigate();

  return (
    <button
      className="glass-back-btn"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      title="Go Back"
    >
      ←
    </button>
  );
}

export default BackButton;