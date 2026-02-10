export const calculateHealthScore = ({ age, height, weight, workType }) => {
    if (!age || !height || !weight) return 60;
  
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
  
    let score = 100;
  
    if (bmi < 18.5) score -= 15;
    else if (bmi > 25) score -= 20;
  
    if (age > 40) score -= 10;
    if (workType === "Sedentary") score -= 10;
    if (workType === "Heavy") score += 5;
  
    return Math.max(40, Math.min(score, 100));
  };