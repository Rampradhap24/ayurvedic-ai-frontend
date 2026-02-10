const API = "http://localhost:5001/api/profile";

export const getMyProfile = async (token) => {
  const res = await fetch(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const updateMyProfile = async (data, token) => {
  const res = await fetch(`${API}/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};