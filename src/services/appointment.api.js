const API = "http://localhost:5001/api/appointment";

export const bookAppointment = async (data, token) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getMyAppointments = async (token) => {
  const res = await fetch(`${API}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};