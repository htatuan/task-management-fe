export const toShortDateTimeString = (dateStr: string) => {
  const originalDate = new Date(dateStr);

  const formattedDate = originalDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedDate.replace(",", "").replace(",", "");
};
