export const getDashboardData = async (token) => {
    const res = await fetch("http://localhost:5001/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return res.json();
  };