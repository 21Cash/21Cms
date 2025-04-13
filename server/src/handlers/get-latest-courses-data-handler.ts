import { getCoursesInfoByDate } from "../database/queries/select-queries/get-courses-infos-on-date";
import { getLatestCoursesInfo } from "../database/queries/select-queries/get-latest-courses-info";

interface GetCoursesDataOnDateProps {
  userId: string;
}

export const getLatestCoursesDataHandler = async ({
  userId,
}: GetCoursesDataOnDateProps) => {
  const data = await getLatestCoursesInfo({
    userId,
  });

  return data;
};
