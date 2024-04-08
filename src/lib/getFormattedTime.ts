export const getFormattedDate = (ms?: number) => {
  if (!ms) return "none";
  return new Intl.DateTimeFormat("en-US", {}).format(new Date(ms));
};
