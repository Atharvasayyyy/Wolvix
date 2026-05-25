export function cn(...values) {
  return values
    .flatMap((value) => {
      if (!value) return [];
      if (Array.isArray(value)) return cn(...value).split(" ").filter(Boolean);
      if (typeof value === "string") return [value];
      if (typeof value === "number") return [String(value)];
      return Object.entries(value)
        .filter(([, enabled]) => Boolean(enabled))
        .map(([className]) => className);
    })
    .join(" ");
}

export function compactNumber(value) {
  const number = Number(value || 0);
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(number);
}

export function rankFromReputation(score = 0) {
  if (score >= 20000) return "Legend";
  if (score >= 8000) return "Alpha";
  if (score >= 2500) return "Hunter";
  return "Cub";
}
