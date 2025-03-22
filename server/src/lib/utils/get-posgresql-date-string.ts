const getPostgresqlDateStringIST = (date: Date): string => {
  const adjustedDate = new Date(date.getTime() + 330 * 60 * 1000);
  return adjustedDate.toISOString().slice(0, 10);
};

export { getPostgresqlDateStringIST };
