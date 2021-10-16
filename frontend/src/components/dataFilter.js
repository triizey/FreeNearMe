export const outdatedFilter = (data) => {
  const filtered = data.filter((event) => new Date(event.date) >= new Date());
  return filtered;
};
