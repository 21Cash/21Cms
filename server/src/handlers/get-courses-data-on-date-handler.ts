import { getCoursesInfoByDate } from "../database/queries/select-queries/get-courses-infos-on-date";

interface GetCoursesDataOnDateProps {
  userId: string;
  dateString: string;
}

export const getCoursesDataOnDateHandler = async ({
  userId,
  dateString,
}: GetCoursesDataOnDateProps) => {
  const data = await getCoursesInfoByDate({
    userId,
    dateString,
  });

  return data;
};
