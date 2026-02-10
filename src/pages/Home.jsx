import "../styles/common.css";
import "../styles/Home.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // Redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-ayurveda">
      <div className="home-box">
        <h1 className="nature-text">Ayurvedic Healer</h1>
        <p className="nature-sub">
          Natural • Herbal • Holistic Healing
        </p>
      </div>
    </div>
  );
}

export default Home;