// Returns in format DD-MM-YYYY
const GetPostgresqlDateString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export { GetPostgresqlDateString };
