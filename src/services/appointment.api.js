const BASE = "http://localhost:5001/api/appointment";

/* ================= GET ================= */
export const getMyAppointments = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      console.error("Invalid userId");
      return [];
    }

    const res = await fetch(`${BASE}/user`, {
      headers: {
        user: userId,
      },
    });

    return await res.json();

  } catch (err) {
    console.error(err);
    return [];
  }
};

/* ================= CREATE ================= */
export const bookAppointment = async (data) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      alert("User not logged in");
      return;
    }

    const res = await fetch(BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user: userId,
      },
      body: JSON.stringify(data),
    });

    return await res.json();

  } catch (err) {
    console.error(err);
  }
};