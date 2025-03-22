const getAttendancePercentage = (
  totalClassesPresent: number,
  totalClassesHeld: number
): number => {
  if (totalClassesPresent === 0) return 0;
  return (totalClassesPresent / totalClassesHeld) * 100;
};

export { getAttendancePercentage };
