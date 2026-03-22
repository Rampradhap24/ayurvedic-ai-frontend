/* ================= MEDICINE LIST ================= */
/* Add all Ayurvedic + Keva medicines here */

const medicineList = [
    "Ashwagandha",
    "Triphala",
    "Hingvastak Churna",
    "Brahmi",
    "Shankhpushpi",
    "Arjuna",
    "Tulsi",
    "Giloy",
    "Amalaki",
    "Haritaki",
    "Bibhitaki",
  
    // 🔹 Your Keva Medicines
    "Cure Cell",
    "BP Care Capsules",
    "Cholesterol Care Capsules",
    "Digestive Care Capsules",
    "Heart Care Capsules",
    "Hridya Amrit",
    "Daily Super Plus",
    "Protein Plus",
    "Multivitamin",
    "Solar Energy Drops",
    "D Toxi Plus",
    "Liver Care",
    "Milk Thistle",
    "HB Tonic",
    "Sugar Control",
  ];
  
  
  /* ================= EXTRACT MEDICINES ================= */
  
  export const extractMedicines = (text) => {
    const found = [];
  
    medicineList.forEach((medicine) => {
      const regex = new RegExp(`\\b${medicine}\\b`, "i");
      if (regex.test(text)) {
        found.push(medicine);
      }
    });
  
    return found;
  };
  
  
  /* ================= HIGHLIGHT MEDICINES ================= */
  
  export const highlightMedicines = (text, medicines) => {
    let updatedText = text;
  
    medicines.forEach((medicine) => {
      const regex = new RegExp(`\\b${medicine}\\b`, "gi");
  
      updatedText = updatedText.replace(
        regex,
        `**${medicine}**`
      );
    });
  
    return updatedText;
  };