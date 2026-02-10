import { consultationsData } from "./adminData";
import "../styles/admin.css";

function ConsultationsAdmin() {
  return (
    <div className="admin-bg">
      <div className="admin-panel">

        <h2>AI Consultation History</h2>

        {consultationsData.map((c, i) => (
          <div className="row-card" key={i}>
            <p><strong>User:</strong> {c.user}</p>
            <p><strong>Symptoms:</strong> {c.symptoms}</p>
            <p><strong>AI Advice:</strong> {c.response}</p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default ConsultationsAdmin;