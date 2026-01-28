import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
import "../styles/dashboardCommon.css";

import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "AI Consultations",
        data: [6, 8, 5, 9, 7],
        backgroundColor: "rgba(126, 217, 87, 0.75)",   // ✅ your selected color
        borderRadius: 10,
        barThickness: 38,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
          font: { weight: "600" },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.15)" },
      },
      y: {
        ticks: { color: "#ffffff" },
        grid: { color: "rgba(255,255,255,0.15)" },
      },
    },
  };

  return (
    <>
      <Navbar />

      {/* ✅ GLOBAL PAGE ANIMATION */}
      <div className="dashboard-bg page-animate">
        <div className="dashboard-wrapper">

          {/* ✅ COMMON GLASS WRAPPER */}
          <div className="dashboard-glass dashboard-common-glass">

            {/* STATS */}
            <div className="stats-grid">
              <div className="card dashboard-common-card">
                <h4>Health Score</h4>
                <div className="value">82%</div>
              </div>

              <div className="card dashboard-common-card">
                <h4>AI Consultations</h4>
                <div className="value">148</div>
              </div>

              <div className="card dashboard-common-card">
                <h4>Medicines</h4>
                <div className="value">67</div>
              </div>

              <div className="card dashboard-common-card">
                <h4>Doctors</h4>
                <div className="value">12</div>
              </div>
            </div>

            {/* MAIN GRID */}
            <div className="main-grid">
              <div className="card dashboard-common-card">
                <h4>Consultation Analytics</h4>
                <Bar data={chartData} options={chartOptions} />
              </div>

              <div className="card dashboard-common-card">
                <h4>Recent Activity</h4>
                <ul className="activity">
                  <li>Digestive issue → Triphala</li>
                  <li>Stress care → Yoga</li>
                  <li>Immunity boost → Chyawanprash</li>
                  <li>Sleep improvement → Brahmi</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;