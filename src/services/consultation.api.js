const API = "http://localhost:5001/api/consultation";

/* SAVE AI CONSULTATION */
export const saveConsultation = async (data, token) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to save consultation");
  }

  return res.json();
};

/* GET LOGGED-IN USER CONSULTATIONS */
export const getMyConsultations = async (token) => {
  const res = await fetch(`${API}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch consultations");
  }

  return res.json();
};