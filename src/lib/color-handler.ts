export const colorHandler = (color: string) => {
  switch (color) {
    default:
      return "#f87171"; // red is default
    case "yellow":
      return "#facc15";
    case "green":
      return "#4ade80";
    case "gray":
      return "#d1d5db";
    case "light-gray":
      return "#71717a";
    case "purple":
      return "#c084fc";
    case "brown":
      return "#50412e";
    case "blue":
      return "#60a5fa";
    case "pink":
      return "#f472b6";
    case "orange":
      return "#fb923c";
  }
};
