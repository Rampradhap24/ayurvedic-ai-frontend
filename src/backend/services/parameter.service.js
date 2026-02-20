import healthParameters from "../data/healthParameters.json" with { type: "json" };

export const findParameterMatch = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();

  return healthParameters.find((item) =>
    lowerMessage.includes(item.parameter.toLowerCase())
  );
};