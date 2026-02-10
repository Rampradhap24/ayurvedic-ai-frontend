import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import "../styles/dashboard.css";
import "../styles/dashboardCommon.css";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

/* REGISTER CHART */
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    healthScore: 0,
    consultations: 0,
    medicines: 0,
    doctors: 0,
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [recentActivity, setRecentActivity] = useState([]);

  /* 🔐 AUTH + LOAD DATA */
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    loadDashboard();
    // eslint-disable-next-line
  }, []);

  /* 📦 FETCH DASHBOARD DATA */
  const loadDashboard = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      const data = await res.json();

      /* ✅ STATS */
      setStats({
        healthScore: data.stats?.healthScore ?? 0,
        consultations: data.stats?.consultations ?? 0,
        medicines: data.stats?.medicines ?? 0,
        doctors: data.stats?.doctors ?? 0,
      });

      /* ✅ CHART */
      setChartData({
        labels: data.analysisChart.labels,
        datasets: [
          {
            label: "Health Analysis",
            data: data.analysisChart.values,
            backgroundColor: [
              "#7ed957", // Health
              "#4da3ff", // Consultations
              "#ff9f40", // Doctors
              "#e84393", // Medicines
            ],
            borderRadius: 12,
            barThickness: 46,
          },
        ],
      });

      /* ✅ ACTIVITY */
      setRecentActivity(Array.isArray(data.recentActivity) ? data.recentActivity : []);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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

  /* ⏳ LOADING */
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="dashboard-bg page-animate">
          <div className="dashboard-wrapper">
            <div className="dashboard-glass">
              <p style={{ opacity: 0.85 }}>Loading dashboard… 🌿</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-bg page-animate">
        <div className="dashboard-wrapper">
          <div className="dashboard-glass">

            {/* ================= STATS ================= */}
            <div className="stats-grid">
              <div className="card">
                <h4>Health Score</h4>
                <div className="value">{stats.healthScore}%</div>
              </div>

              <div className="card">
                <h4>AI Consultations</h4>
                <div className="value">{stats.consultations}</div>
              </div>

              <div className="card">
                <h4>Medicines Used</h4>
                <div className="value">{stats.medicines}</div>
              </div>

              <div className="card">
                <h4>Doctors Consulted</h4>
                <div className="value">{stats.doctors}</div>
              </div>
            </div>

            {/* ================= MAIN GRID ================= */}
            <div className="main-grid">

              {/* 📊 CHART */}
              <div className="card chart-card">
                <h4>Consultation Analytics</h4>
                <div style={{ height: "260px" }}>
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>

              {/* 🕒 RECENT ACTIVITY */}
              <div className="card activity-card">
                <h4>Recent Activity</h4>

                {recentActivity.length === 0 ? (
                  <p className="activity-empty">
                    No recent activity 🌿
                  </p>
                ) : (
                  <div className="activity-list">
                    {recentActivity.map((item, index) => (
                      <div
                        className="activity-item"
                        key={`${item.type}-${index}`}
                      >
                        <div className={`activity-icon ${item.type}`}>
                          {item.type === "consultation" && "🩺"}
                          {item.type === "order" && "💊"}
                          {item.type === "appointment" && "👨‍⚕️"}
                        </div>

                        <div className="activity-content">
                          <div className="activity-text">
                            {item.text}
                          </div>
                          <div className="activity-date">
                            {new Date(item.date).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;