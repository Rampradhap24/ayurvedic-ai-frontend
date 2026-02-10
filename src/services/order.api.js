const API = "http://localhost:5001/api/orders";

export const createOrder = async (data, token) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ REQUIRED
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getMyOrders = async (token) => {
  const res = await fetch(`${API}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};