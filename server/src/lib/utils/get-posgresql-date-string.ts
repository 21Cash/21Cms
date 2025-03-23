const getPostgresqlDateStringIST = (dateInUTC: Date): string => {
  const adjustedDate = new Date(dateInUTC.getTime() + 330 * 60 * 1000);
  return adjustedDate.toISOString().slice(0, 10);
};

export { getPostgresqlDateStringIST };
