import healthData from "../data/healthParameters.json" assert { type: "json" };

export const findKevaMedicinesFromText = (userText) => {
  const matchedMedicines = new Set();

  healthData.forEach((item) => {
    const parameter = item.parameter.toLowerCase();

    if (userText.toLowerCase().includes(parameter)) {
      item.kevaMedicines.forEach((med) =>
        matchedMedicines.add(med)
      );
    }
  });

  return Array.from(matchedMedicines);
};